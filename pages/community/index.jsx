import React from "react";

import { PrivateRoute } from "@/components/privateroute";
import { Community } from "@/components/community";

const area = () => {
  return (
    <PrivateRoute>
      <Community />
    </PrivateRoute>
  );
};

export default area;
