import React from "react";
import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";

import dynamic from "next/dynamic";

import { DarkModeSwitch } from "./darkmodeswitch";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";

import profileDefault from "@/assets/profile.jpg";

const Component = () => {
  const { removeUser, user } = useAuthStore();

  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.push("/auth/login");
  };

  return (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            bordered
            as="button"
            color="secondary"
            size="md"
            src={profileDefault?.src}
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="User menu actions"
        onAction={(actionKey) => {
          if (actionKey === "logout") {
            handleLogout();
          }
        }}
      >
        <Dropdown.Item key="profile" css={{ height: "$18" }}>
          <Text b color="inherit" css={{ d: "flex" }}>
            Name: {user?.full_name}
          </Text>
          <Text b color="inherit" css={{ d: "flex" }}>
            Email: {user?.email}
          </Text>
        </Dropdown.Item>

        <Dropdown.Item key="logout" withDivider color="error">
          Log Out
        </Dropdown.Item>
        <Dropdown.Item key="switch" withDivider>
          <DarkModeSwitch />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const UserDropdown = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
