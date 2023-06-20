import React, { useState } from "react";

import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { useTheme } from "@nextui-org/react";

import logoBlack from "@/assets/logo_black.png";
import logoWhite from "@/assets/logo_white.png";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

const Component = () => {
  const { isDark } = useTheme();

  const router = useRouter();

  return (
    <Box>
      <Flex align={"center"} css={{ gap: "$7" }}>
        {/* {company.logo} */}

        <img
          onClick={() => router.push("/")}
          alt="Logo"
          src={isDark ? logoWhite.src : logoBlack.src}
          width="160px"
          height="160px"
          style={{ cursor: "pointer" }}
        />
      </Flex>
    </Box>
  );
};

export const CompaniesDropdown = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
