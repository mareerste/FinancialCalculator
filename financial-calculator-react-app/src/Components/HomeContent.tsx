import React from "react";

const HomeContent = ({ title, message }) => {
  return (
    <>
      <br />
      <div
        className="container mb-5 main-content"
        style={{ padding: "5vh", minHeight: "60vh" }}
      >
        <h2 className="text-center">
          {title}
          <span>
            <br />
          </span>
          <small className="text-muted">{message}</small>
        </h2>
        <hr />

        
      </div>
    </>
  );
};

export default HomeContent;
