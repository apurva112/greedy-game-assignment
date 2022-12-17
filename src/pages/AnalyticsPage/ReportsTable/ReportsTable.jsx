import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  filterDataSelector,
  reportsDataSelector,
  sortSelector,
  tagsSelector,
} from "../../../selectors/analytics";
import dynamicSort from "../../../utils/dynamicSort";
import ReportsRowData from "../ReportsRowData/ReportsRowData";
import "./ReportsTable.css";
import SortButton from "../SortButton/SortButton";
import FilterButton from "../FilterButton";

const ReportsTable = () => {
  const sortType = useSelector(sortSelector);
  const tagsData = useSelector(tagsSelector);
  const reportsData = useSelector(reportsDataSelector);
  const filters = useSelector(filterDataSelector);

  const sortedReportsData = useMemo(() => {
    if (reportsData) {
      const data = [...reportsData];
      return data?.sort(dynamicSort(sortType.sortBy, sortType.order));
    }
    return reportsData;
  }, [reportsData, sortType.order, sortType.sortBy]);

  const filteredData = useMemo(() => {
    return sortedReportsData
      ?.filter(
        (data) =>
          data.revenue >= filters.revenue.currentMin &&
          data.revenue <= filters.revenue.currentMax
      )
      ?.filter(
        (data) =>
          data.ctr >= filters.ctr.currentMin &&
          data.ctr <= filters.ctr.currentMax
      )
      ?.filter(
        (data) =>
          data.impressions >= filters.impressions.currentMin &&
          data.impressions <= filters.impressions.currentMax
      )
      ?.filter(
        (data) =>
          data.responses >= filters.responses.currentMin &&
          data.responses <= filters.responses.currentMax
      )
      ?.filter(
        (data) =>
          data.requests >= filters.requests.currentMin &&
          data.requests <= filters.requests.currentMax
      )
      ?.filter(
        (data) =>
          data.clicks >= filters.clicks.currentMin &&
          data.clicks <= filters.clicks.currentMax
      )
      ?.filter(
        (data) =>
          data.fill_rate >= filters.fill_rate.currentMin &&
          data.fill_rate <= filters.fill_rate.currentMax
      );
  }, [filters, sortedReportsData]);
  const headerData = filteredData.reduce((acc, current) => {
    return {
      date: "",
      app_name: (acc?.app_name ?? 0) + 1,
      requests: (acc?.requests ?? 0) + current?.requests,
      responses: (acc?.responses ?? 0) + current?.responses,
      impressions: (acc?.impressions ?? 0) + current?.impressions,
      clicks: (acc?.clicks ?? 0) + current?.clicks,
      revenue:
        ((acc?.revenue ?? 0) + current?.revenue) / ((acc?.revenue ?? 0) + 1) +
        (current?.revenue ?? 0 - acc?.revenue) / ((acc?.revenue ?? 0) + 1),
      fill_rate:
        ((acc?.fill_rate ?? 0) + current?.fill_rate) /
          ((acc?.fill_rate ?? 0) + 1) +
        (current?.fill_rate ?? 0 - acc?.fill_rate) /
          ((acc?.fill_rate ?? 0) + 1),
      ctr:
        ((acc?.ctr ?? 0) + current?.ctr) / ((acc?.ctr ?? 0) + 1) +
        (current?.ctr ?? 0 - acc?.ctr) / ((acc?.ctr ?? 0) + 1),
    };
  }, {});
  console.log(headerData);
  console.log(filteredData);
  return (
    <div className="app-table">
      <table>
        <thead>
          <tr>
            {tagsData?.map(
              (tag) =>
                tag.selected && (
                  <th key={tag.key}>
                    <div className="table-head">
                      <div>{tag.name}</div>
                      {filters && <FilterButton tag={tag} />}
                      <SortButton tagKey={tag.key} />
                    </div>
                  </th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* {Object.keys(headerData)?.map((key, index) => (
              <td>{headerData[key]}</td>
            ))} */}
          </tr>
          {filteredData?.map((data, index) => (
            <tr key={index}>
              {tagsData?.map((tag, key) => (
                <ReportsRowData
                  tag={tag}
                  rowData={data}
                  key={data.clicks + key}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
