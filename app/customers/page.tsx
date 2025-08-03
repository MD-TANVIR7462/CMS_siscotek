import { getData } from "@/server/serverActions";
import React from "react";
import CustomerIndex from "./customerIndex";

const CustomerPage = async () => {
  const customerData = (await getData("customer/get-customer"))?.data;

  return <>{customerData && <CustomerIndex customerData={customerData} />}</>;
};

export default CustomerPage;
