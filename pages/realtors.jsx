import React from "react";
import { Realtors } from "../components/realtors";
import { PrivateRoute } from "@/components/privateroute";

const realtors = () => {
  return (
    <PrivateRoute>
      <Realtors />
    </PrivateRoute>
  );
};

export default realtors;
