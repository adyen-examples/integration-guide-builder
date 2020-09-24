import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coeSpaceReducer from "../features/codespace/codeSpaceSlice";
import previewReducer from "../features/preview/previewSlice";

export const store = configureStore({
  reducer: {
    codeSpace: coeSpaceReducer,
    preview: previewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
