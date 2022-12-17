import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronExpand, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { sortSelector } from "../../../selectors/analytics";
import { setSort } from "../../../store/analytics";

export default function SortButton({ tagKey }) {
  const dispatch = useDispatch();
  const sortType = useSelector(sortSelector);

  const toggleOrder = useCallback((order) => {
    if (order === "asc") return "desc";
    else return "asc";
  }, []);

  const handleSort = useCallback(() => {
    if (sortType.sortBy === tagKey)
      dispatch(setSort({ sortBy: tagKey, order: toggleOrder(sortType.order) }));
    else dispatch(setSort({ sortBy: tagKey, order: "asc" }));
  }, [dispatch, sortType, tagKey, toggleOrder]);

  if (sortType.sortBy === tagKey && sortType.order === "asc") {
    return <BsChevronDown onClick={handleSort} />;
  } else if (sortType.sortBy === tagKey && sortType.order === "desc") {
    return <BsChevronUp onClick={handleSort} />;
  } else {
    return <BsChevronExpand onClick={handleSort} />;
  }
}
