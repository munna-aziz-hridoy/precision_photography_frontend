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

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PHONE", uid: "phone_number" },
  { name: "STATUS", uid: "user_type" },
  { name: "COMPANY NAME", uid: "company_name" },
  { name: "WEBSITE", uid: "website" },
  { name: "ACTIONS", uid: "actions" },
];

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
      <Text h3>Realtors</Text>
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
          <AddUser refetch={refetch} />
        </Flex>
      </Flex>

      {loading ? (
        <Loading style={{ marginTop: "40px" }} />
      ) : (
        <TableWrapper
          columns={columns}
          data={users}
          totalPages={totalPage}
          setPage={setPage}
          refetch={refetch}
        />
      )}
    </Flex>
  );
};

export const Realtors = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
