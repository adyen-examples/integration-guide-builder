import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import fetchFromGH from "github-fetch-file";
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
}

const initialState: CodeSpaceState = {
  options: { platforms: [] },
  error: "",
  selected: {
    isAllSet: false,
  },
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
  },
});

export const { setOptions, setError, setSelected } = codeSpaceSlice.actions;

function getDefaultSelected(pl: Platform): SelectedOptions {
  return {
    platform: pl,
    server: pl?.servers?.[0],
    client: pl?.servers?.[0].clients?.[0],
    isAllSet: true,
  };
}

export const getFileFromGH = (fileName: string): AppThunk => async (dispatch, getState) => {
  try {
    const res = await fetchFromGitHub(fileName);
    dispatch(setOptions(res));
    dispatch(setSelected(getDefaultSelected(getState().codeSpace.options.platforms[0])));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message || error));
  }
};

export const getSelected = (state: RootState) => state.codeSpace.selected;
export const getOptions = (state: RootState) => state.codeSpace.options;

export default codeSpaceSlice.reducer;
