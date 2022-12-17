import { createSlice } from "@reduxjs/toolkit";
import { TAGS_DATA } from "../data/tagsData";

const initialState = {
  showSettings: false,
  reportsData: null,
  tags: TAGS_DATA,
  dateRange: null,
  sort: { sortBy: "date", order: "asc" },
  filter: null,
};

export const analytics = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setShowSettings: (state, action) => {
      state.showSettings = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setReportsData: (state, action) => {
      state.reportsData = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setDateRange,
  setFilter,
  setReportsData,
  setShowSettings,
  setSort,
  setTags,
} = analytics.actions;
export default analytics.reducer;
