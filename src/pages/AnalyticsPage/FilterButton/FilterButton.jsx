import React, { useCallback, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Whisper, RangeSlider } from "rsuite";
import { filterDataSelector } from "../../../selectors/analytics";
import { setFilter } from "../../../store/analytics";

const Overlay = React.forwardRef(
  ({ style, onClose, value, onChange, ...rest }, ref) => {
    const styles = {
      ...style,
      color: "#000",
      background: "#fff",
      width: 200,
      padding: 10,
      borderRadius: 4,
      position: "absolute",
      border: "1px solid #ddd",
      boxShadow: "0 3px 6px -2px rgba(0, 0, 0, 0.6)",
      display: "flex",
      flexDirection: "column"
    };

    const [currentRange, setCurrentRange] = useState([
      value?.min || 0,
      value?.max || 100,
    ]);

    const handleOnRangeChange = useCallback((range) => {
      setCurrentRange(range);
    }, []);

    useEffect(() => {
      setCurrentRange([value?.currentMin || 0, value?.currentMax || 100]);
    }, [value]);

    const handleApply = useCallback(() => {
      onChange(currentRange);
      onClose();
    }, [currentRange, onChange, onClose]);

    const handleReset = useCallback(() => {
      setCurrentRange([value.min, value.max]);
      onChange([value.min, value.max]);
      onClose();
    }, [onChange, onClose, value.max, value.min]);

    return (
      <div {...rest} style={styles} ref={ref}>
        {/* <div style={{display: "flex"}}> */}
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", justifyItems: "center" }}>
          {value?.min || 0}
          <div>
          <RangeSlider
            max={value?.max}
            value={currentRange}
            defaultValue={[value?.min || 0, value?.max || 0]}
            onChange={handleOnRangeChange}
            style={{width: "200%", margin: "0 10px", verticalAlign: "middle", }}
          />
          </div>
          {value?.max || 0}
        </div>
        <hr />
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    );
  }
);

export default function FilterButton({ tag }) {
  const dispatch = useDispatch();
  const filterData = useSelector(filterDataSelector);

  const handleOnRangeChange = useCallback(
    (range) => {
      dispatch(
        setFilter({
          ...filterData,
          [tag.key]: {
            ...filterData[tag.key],
            currentMin: range[0],
            currentMax: range[1],
          },
        })
      );
    },
    [dispatch, filterData, tag.key]
  );
  return (
    <Whisper
      trigger="click"
      speaker={(props, ref) => {
        const { className, bottom, onClose } = props;
        return (
          <Overlay
            style={{ bottom }}
            onClose={onClose}
            className={className}
            value={filterData[tag.key]}
            onChange={handleOnRangeChange}
            ref={ref}
          />
        );
      }}
    >
      <button>
        <FaFilter />
      </button>
    </Whisper>
  );
}
