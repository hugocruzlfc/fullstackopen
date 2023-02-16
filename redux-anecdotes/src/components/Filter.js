import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { filterChange } from "../reducers/filterReducer";

const style = {
  marginBottom: 5,
  marginTop: 20,
};

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(filterChange(filterValue));
  };

  return (
    <div style={style}>
      filter{" "}
      <input
        value={filter.filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
