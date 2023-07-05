import React, { useState } from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { CompaniesDropdown } from "./companies-dropdown";

import { SettingsIcon } from "../icons/sidebar/settings-icon";

import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";

import { useSidebarContext } from "../layout/layout-context";

import { BsGlobeAsiaAustralia, BsPeopleFill } from "react-icons/bs";
import { FaUserTie, FaHome, FaMusic } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";

import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import profileDefault from "@/assets/profile.jpg";
import useAuthStore from "@/store/authStore";

export const Component = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  const { removeUser, user } = useAuthStore();

  const handleLogout = () => {
    removeUser();
    router.push("/auth/login");
  };

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <CompaniesDropdown />
        </Sidebar.Header>
        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarMenu>
              <SidebarItem
                isActive={router.pathname === "/realtors"}
                title="Realtors"
                icon={<FaUserTie />}
                href="realtors"
              />
              <SidebarItem
                isActive={router.pathname.includes("/areas")}
                title="Areas"
                icon={<BsGlobeAsiaAustralia />}
                href="areas"
              />
              <SidebarItem
                isActive={router.pathname.includes("/community")}
                title="Communities"
                icon={<BsPeopleFill />}
                href="/community"
              />

              <SidebarItem
                isActive={router.pathname.includes("/property")}
                title="Properties"
                icon={<FaHome />}
                href="/property"
              />
              <SidebarItem
                isActive={router.pathname.includes("/rentel")}
                title="Rentels"
                icon={<MdHomeWork />}
                href="/rentel"
              />
              <SidebarItem
                isActive={router.pathname.includes("/music")}
                title="Musics"
                icon={<FaMusic />}
                href="/music"
              />
            </SidebarMenu>
          </Sidebar.Body>
          <Sidebar.Footer>
            <Tooltip
              content={"Logout"}
              rounded
              color="primary"
              css={{ cursor: "pointer" }}
            >
              <BiLogOutCircle
                onClick={handleLogout}
                fontSize={26}
                color="#F31260"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>

            <Tooltip content={user?.full_name} rounded color="primary">
              <Avatar
                src={user?.broker_logo || profileDefault?.src}
                size={"sm"}
              />
            </Tooltip>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  );
};

export const SidebarWrapper = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
