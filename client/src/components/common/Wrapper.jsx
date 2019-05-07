import React from "react";

const Wrapper = ({ children, columns, row }) => (
  <div className={row}>
    <div className={columns}>{children}</div>
  </div>
);

export default Wrapper;
