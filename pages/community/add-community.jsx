import React from "react";

import { PrivateRoute } from "@/components/privateroute";
import { AddCommunity } from "@/components/community/add-community";

const addArea = () => {
  return (
    <PrivateRoute>
      <AddCommunity />
    </PrivateRoute>
  );
};

export default addArea;
