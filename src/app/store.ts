import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coeSpaceReducer from "../features/codespace/CodeSpaceSlice";
import previewReducer from "../features/preview/PreviewSlice";

export const store = configureStore({
  reducer: {
    coeSpace: coeSpaceReducer,
    preview: previewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
