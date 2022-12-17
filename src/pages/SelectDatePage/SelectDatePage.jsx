import React, { useCallback } from "react";
import { batch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "../../components/DatePicker";
import SettingsCard from "../../components/SettingsCard";
import {
  dateRangeSelector,
  showSettingsSelector,
  tagsSelector,
} from "../../selectors/analytics";
import { setDateRange, setShowSettings, setTags } from "../../store/analytics";
import AnalyticsPage from "../AnalyticsPage";
import "./SelectDatePage.css";

export default function SelectDatePage() {
  const dispatch = useDispatch();
  const showSettings = useSelector(showSettingsSelector);
  const tags = useSelector(tagsSelector);
  const dateRange = useSelector(dateRangeSelector);

  const handleToggleSettings = useCallback(() => {
    dispatch(setShowSettings(!showSettings));
  }, [dispatch, showSettings]);

  const handleDateChange = useCallback(
    (newDateRange) => {
      dispatch(setDateRange(newDateRange));
    },
    [dispatch]
  );

  const modifyTags = useCallback(
    (newTags) => {
      batch(() => {
        dispatch(setTags(newTags));
        dispatch(setShowSettings(false));
      });
    },
    [dispatch]
  );

  return (
    <div className="App">
      <h1>Analytics</h1>
      <div className="App-Upper">
        <DatePicker onChange={handleDateChange} value={dateRange} />
        <button onClick={handleToggleSettings}>Settings</button>
      </div>
      {showSettings && <SettingsCard value={tags} onChange={modifyTags} />}
      {dateRange && <AnalyticsPage />}
    </div>
  );
}
