import React, { useState } from "react";
import { useRouter } from "next/router";

import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { WrapperLayout } from "./layout.styles";

import dynamic from "next/dynamic";

const Component = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  const router = useRouter();

  if (router.pathname.includes("auth")) {
    return children;
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <WrapperLayout>
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </WrapperLayout>
    </SidebarContext.Provider>
  );
};

export const Layout = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
