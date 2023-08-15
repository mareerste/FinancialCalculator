import React from "react";
import PaymentsContent from "../Components/PaymentsContent.tsx";

const PaymentsPage = ({ loggedUser, changeUser }) => {
  return (
    <PaymentsContent
      title={"Payments"}
      message={"Track your monthly income"}
      loggedUser={loggedUser}
      changeUser={changeUser}
    ></PaymentsContent>
  );
};

export default PaymentsPage;
