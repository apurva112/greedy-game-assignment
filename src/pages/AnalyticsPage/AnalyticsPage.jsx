import React, { useCallback, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  dateRangeSelector,
  reportsDataSelector,
} from "../../selectors/analytics";
import { useGetAppsQuery } from "../../services/appService";
import { useLazyGetReportQuery } from "../../services/reportService";
import { setFilter, setReportsData } from "../../store/analytics";
import formatDate from "../../utils/formatDate";
import generateFilters from "../../utils/generateFilters";
import ReportsTable from "./ReportsTable";

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const dateRange = useSelector(dateRangeSelector);
  const [
    fetchReports,
    { isFetching, reportError, data: reportsData, isSuccess: reportSuccess },
  ] = useLazyGetReportQuery();
  const reportdata = useSelector(reportsDataSelector);
  const { data: appsData, appError, isSuccess: appSuccess } = useGetAppsQuery();

  const getAppName = useCallback(
    (id) => {
      if (appError) return id;
      return appsData?.find((data) => data.app_id === id)?.app_name;
    },
    [appError, appsData]
  );

  useEffect(() => {
    const startDate = formatDate(dateRange[0]);
    const endDate = formatDate(dateRange[1]);
    fetchReports({ startDate, endDate });
  }, [dateRange, fetchReports]);

  useEffect(() => {
    if (appSuccess && reportSuccess) {
      const data = reportsData.map((d) => {
        return {
          ...d,
          fill_rate: Number(((d.requests / d.responses) * 100).toFixed(2)),
          ctr: Number(((d.clicks / d.impressions) * 100).toFixed(2)),
          date: new Date(d.date).toDateString(),
          revenue: Number(Number(d?.revenue)?.toFixed(2)),
          app_name: getAppName(d.app_id),
        };
      });
      const filters = generateFilters(data);
      batch(() => {
        dispatch(setReportsData(data));
        dispatch(setFilter(filters));
      });
    }
  }, [appSuccess, dispatch, getAppName, reportSuccess, reportsData]);

  if (isFetching) {
    return <div>Loading...</div>;
  } else if (appError || reportError) {
    return <div>error.data</div>;
  } else if (
    appSuccess &&
    reportSuccess &&
    reportsData?.length > 0 &&
    appsData?.length > 0 &&
    reportdata
  ) {
    return <ReportsTable />;
  } else return <>no data</>;
}
