import React from "react";

import { PrivateRoute } from "@/components/privateroute";
import { EditArea } from "@/components/area/edit-area";

const editArea = () => {
  return (
    <PrivateRoute>
      <EditArea />
    </PrivateRoute>
  );
};

export default editArea;
