import { Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

const Component = ({ title, children }) => {
  return (
    <Flex css={{ gap: "$4" }} direction={"column"}>
      <Text
        span
        size={"$xs"}
        weight={"normal"}
        css={{
          letterSpacing: "0.04em",
          lineHeight: "$xs",
        }}
      >
        {title}
      </Text>
      {children}
    </Flex>
  );
};

export const SidebarMenu = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
