import React from "react";

export default function ReportsRowData({ tag, rowData }) {
  switch (tag.key) {
    case "fill_rate":
      return tag.selected && <td>{rowData[tag.key]} %</td>;
    case "ctr":
      return tag.selected && <td>{rowData[tag.key]} %</td>;
    case "revenue":
      return tag.selected && <td>$ {rowData[tag.key]}</td>;
    case "app_name":
    case "date":
    case "clicks":
    case "requests":
    case "responses":
    case "impressions":
      return tag.selected && <td>{rowData[tag.key]}</td>;
    default:
      return null;
  }
}
