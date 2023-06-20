import React, { useState } from "react";
import { Input, Text, Loading } from "@nextui-org/react";

import dynamic from "next/dynamic";

import useAuthStore from "@/store/authStore";

import { DotsIcon } from "../icons/accounts/dots-icon";

import { InfoIcon } from "../icons/accounts/info-icon";
import { TrashIcon } from "../icons/accounts/trash-icon";

import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import { AddUser } from "./add-user";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useRealtors } from "../hooks/useRealtors";

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
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          //  mt: "$10",
          //  px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Text h3>All Users</Text>
      <Flex
        css={{ gap: "$8" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Search users"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <AddUser />
        </Flex>
      </Flex>

      {loading ? (
        <Loading style={{ marginTop: "40px" }} />
      ) : (
        <TableWrapper data={users} totalPages={totalPage} setPage={setPage} />
      )}
    </Flex>
  );
};

export const Realtors = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
