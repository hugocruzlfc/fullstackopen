import React from "react";

export default function FilterUser({ handleFilter }) {
  return (
    <div>
      <p>
        filter shown with
        <input
          type="text"
          onChange={handleFilter}
        />
      </p>
    </div>
  );
}
