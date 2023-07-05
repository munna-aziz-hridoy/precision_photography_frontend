import React from "react";

import { PrivateRoute } from "@/components/privateroute";
import { EditCommunity } from "@/components/community/edit-community";

const editArea = () => {
  return (
    <PrivateRoute>
      <EditCommunity />
    </PrivateRoute>
  );
};

export default editArea;
