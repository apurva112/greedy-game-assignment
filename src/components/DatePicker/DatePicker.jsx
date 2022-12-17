import React from "react";
import DateRangePicker from "rsuite/DateRangePicker";
import "./DatePicker.css";

export default function DatePicker(props) {
  return (
    <DateRangePicker
      placeholder="Select Date Range"
      defaultValue={[new Date("2021-06-01"), new Date("2021-06-02")]}
      size="md"
      {...props}
    />
  );
}
