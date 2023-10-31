import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface RollsListState {
  items: { svgElement: string }[] | null;
}
const initialState: RollsListState = {
  items: null,
};
export const rollsList = createSlice({
  name: "rollsList",
  initialState,
  reducers: {
    reset: () => initialState,
    setRollsList: (
      state,
      action: PayloadAction<{
        items: any;
      }>
    ) => {
      const { items } = action.payload;

      state.items = items;
    },
  },
});

export const { setRollsList, reset } = rollsList.actions;

export default rollsList.reducer;
