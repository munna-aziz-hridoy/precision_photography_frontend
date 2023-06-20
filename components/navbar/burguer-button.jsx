import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import { StyledBurgerButton } from "./navbar.styles";

import dynamic from "next/dynamic";

export const Component = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <StyledBurgerButton open={collapsed} onClick={setCollapsed}>
      <div />
      <div />
    </StyledBurgerButton>
  );
};

export const BurguerButton = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
