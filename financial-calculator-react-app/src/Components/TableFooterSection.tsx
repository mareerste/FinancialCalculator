import React from "react";

const TableFooterSection = ({ children }) => {
  return (
    <div className="container d-flex text-center align-middle justify-content-end month-handler mb-3 mt-3">
      {children?.length > 0 ? (
        children?.map((child) => {
          return (
            <div
              className="d-flex align-items-center ml-3"
              style={{ marginLeft: "3vh", marginRight: "2vh" }}
            >
              {child}
            </div>
          );
        })
      ) : (
        <div
          className="d-flex align-items-center ml-3"
          style={{ marginLeft: "3vh", marginRight: "2vh" }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default TableFooterSection;
