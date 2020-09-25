import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { fetchFromGitHub } from "../../utils/githubFetch";

interface Client {
  name: string;
  label: string;
}
interface Server {
  name: string;
  label: string;
  clients?: Client[];
}
interface Platform {
  name: string;
  label: string;
  servers?: Server[];
}
interface CodeSpaceState {
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
}

const initialState: CodeSpaceState = {
  options: { platforms: [] },
  error: "",
  selected: {
    isAllSet: false,
  },
  markdown: "",
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
  },
});

export const { setOptions, setError, setSelected, setMarkdown } = codeSpaceSlice.actions;

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
  const [path, ok] = getRepoFilePath(getState().codeSpace.selected);
  if (ok) {
    try {
      const res = await fetchFromGitHub(`${path}/README.md`);
      const md = await res.text();
      dispatch(setMarkdown(md));
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message || error));
    }
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
