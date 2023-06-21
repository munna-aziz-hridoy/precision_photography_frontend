import React from "react";
import { Area } from "../components/area";
import { PrivateRoute } from "@/components/privateroute";

const area = () => {
  return (
    <PrivateRoute>
      <Area />
    </PrivateRoute>
  );
};

export default area;
