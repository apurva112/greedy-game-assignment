import { createSelector } from "@reduxjs/toolkit";

const baseSelector = (state) => state.analytics;

export const showSettingsSelector = createSelector(
  (state) => baseSelector(state).showSettings,
  (showSettings) => showSettings
);

export const tagsSelector = createSelector(
  (state) => baseSelector(state).tags,
  (tags) => tags
);

export const dateRangeSelector = createSelector(
  (state) => baseSelector(state).dateRange,
  (dateRange) => dateRange
);

export const sortSelector = createSelector(
  (state) => baseSelector(state).sort,
  (sort) => sort
);

export const reportsDataSelector = createSelector(
  (state) => baseSelector(state).reportsData,
  (reportsData) => reportsData
);

export const filterDataSelector = createSelector(
  (state) => baseSelector(state).filter,
  (filter) => filter
);
