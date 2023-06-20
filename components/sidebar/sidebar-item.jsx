import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

const Component = ({ icon, title, isActive, href = "" }) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <Link
      css={{
        color: "$accents9",
        maxWidth: "100%",
      }}
      href={href}
    >
      <Flex
        onClick={handleClick}
        css={{
          gap: "$6",
          width: "100%",
          minHeight: "44px",
          height: "100%",
          alignItems: "center",
          px: "$7",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          "&:active": {
            transform: "scale(0.98)",
          },
          ...(isActive
            ? {
                bg: "$blue200",
                "& svg path": {
                  fill: "$blue600",
                },
              }
            : { "&:hover": { bg: "$accents2" } }),
        }}
        align={"center"}
      >
        {icon}
        <Text
          span
          weight={"normal"}
          size={"$base"}
          css={{
            color: "$accents9",
          }}
        >
          {title}
        </Text>
      </Flex>
    </Link>
  );
};

export const SidebarItem = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
