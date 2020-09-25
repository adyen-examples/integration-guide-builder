import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { fetchFromGitHub } from "../../utils/githubFetch";

export interface Client {
  name: string;
  label: string;
}
export interface Server {
  name: string;
  label: string;
  clients?: Client[];
}
export interface Platform {
  name: string;
  label: string;
  servers?: Server[];
}
export interface SourceFile {
  name: string;
  content: string;
}
export interface CodeSpaceState {
  error: string;
  options: {
    platforms: Platform[];
  };
  selected: {
    platform?: Platform;
    server?: Server;
    client?: Client;
    isAllSet?: boolean;
  };
  markdown: string;
  sourceFiles: SourceFile[];
}
const MARKDOWN_DEF = "## Selection not found";
const SOURCE_DEF = {
  name: "index",
  content: "",
};
const initialState: CodeSpaceState = {
  options: { platforms: [] },
  error: "",
  selected: {
    isAllSet: false,
  },
  markdown: MARKDOWN_DEF,
  sourceFiles: [SOURCE_DEF],
};

export type OptionFromGH = typeof initialState.options;
export type SelectedOptions = typeof initialState.selected;

export const codeSpaceSlice = createSlice({
  name: "codeSpace",
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<OptionFromGH>) => {
      state.options = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSelected: (state, action: PayloadAction<SelectedOptions>) => {
      state.selected = action.payload;
    },
    setMarkdown: (state, action: PayloadAction<string>) => {
      state.markdown = action.payload;
    },
    setSource: (state, action: PayloadAction<SourceFile[]>) => {
      state.sourceFiles = action.payload;
    },
  },
});

export const { setOptions, setError, setSelected, setMarkdown, setSource } = codeSpaceSlice.actions;

export const getOptionsFile = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await fetchFromGitHub("index.json");
    const json = await res.json();
    dispatch(setOptions(json));
    dispatch(setSelected(getDefaultSelected(getState().codeSpace.options.platforms[0])));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message || error));
  }
};

export const getSourceFiles = (): AppThunk => async (dispatch, getState) => {
  const { selected } = getState().codeSpace;
  const [path, ok] = getRepoFilePath(selected);
  if (ok) {
    try {
      const res = await fetchFromGitHub(`${path}/README.md`);
      const md = await res.text();
      dispatch(setMarkdown(md));
      const indexRes = await fetchFromGitHub(`${path}/index.json`);
      const index = await indexRes.json();

      // using promise.all to fetch these in parallel
      const sourceFiles: SourceFile[] = await Promise.all(
        index.map(async (name: string) => {
          const res = await fetchFromGitHub(`${path}/${name}`);
          const content = await res.text();
          return {
            name,
            content,
          };
        })
      );
      dispatch(setSource(sourceFiles));
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message || error));
      dispatch(setMarkdown(MARKDOWN_DEF));
      dispatch(setSource([SOURCE_DEF]));
    }
  } else {
    dispatch(setMarkdown(MARKDOWN_DEF));
    dispatch(setSource([SOURCE_DEF]));
  }
};

export const getSelected = (state: RootState) => state.codeSpace.selected;
export const getOptions = (state: RootState) => state.codeSpace.options;

export default codeSpaceSlice.reducer;

function getRepoFilePath(sel: SelectedOptions): [string, boolean] {
  return [`${sel.platform?.name}-${sel.server?.name}-${sel.client?.name}`, sel.isAllSet || false];
}

function getDefaultSelected(pl: Platform): SelectedOptions {
  return {
    platform: pl,
    server: pl?.servers?.[0],
    client: pl?.servers?.[0].clients?.[0],
    isAllSet: true,
  };
}
