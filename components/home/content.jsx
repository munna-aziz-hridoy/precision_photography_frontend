import React, { useState } from "react";
import { Text, Link, Loading } from "@nextui-org/react";
import { Box } from "../styles/box";

import dynamic from "next/dynamic";

import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import NextLink from "next/link";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import { useRealtors } from "../hooks/useRealtors";
import toast from "react-hot-toast";

const Component = () => {
  const [page, setPage] = useState(1);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const { users, totalPage, totalRecords, loading, refetch } = useRealtors(
    auth_token?.access,
    page,
    router,
    toast,
    removeUser
  );

  return (
    <Box css={{ overflow: "hidden", height: "100%" }}>
      <Flex
        css={{
          gap: "$8",
          pt: "$5",
          height: "fit-content",
          flexWrap: "wrap",
          "@lg": {
            flexWrap: "nowrap",
          },
          "@sm": {
            pt: "$10",
          },
        }}
        justify={"center"}
      ></Flex>

      <Flex
        direction={"column"}
        justify={"center"}
        css={{
          width: "100%",
          py: "$10",
          px: "$10",
          mt: "$8",
          // "@sm": { px: "$20" },
        }}
      >
        <Flex justify={"between"} wrap={"wrap"}>
          <Text
            h3
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "inherit",
              },
            }}
          >
            Latest Users
          </Text>
          <NextLink href="/accounts">
            <Link
              block
              color="primary"
              css={{
                textAlign: "center",
                "@lg": {
                  textAlign: "inherit",
                },
              }}
            >
              View All
            </Link>
          </NextLink>
        </Flex>
        {loading ? (
          <Loading style={{ marginTop: "40px" }} />
        ) : (
          <TableWrapper data={users} totalPages={totalPage} setPage={setPage} />
        )}
      </Flex>
    </Box>
  );
};

export const Content = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
