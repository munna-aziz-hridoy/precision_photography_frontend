import React from "react";

import { PrivateRoute } from "@/components/privateroute";
import { AddArea } from "@/components/area/add-area";

const addArea = () => {
  return (
    <PrivateRoute>
      <AddArea />
    </PrivateRoute>
  );
};

export default addArea;
