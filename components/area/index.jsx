import React, { useState } from "react";

import { Input, Text, Loading } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { TrashIcon } from "../icons/accounts/trash-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { DotsIcon } from "../icons/accounts/dots-icon";
import dynamic from "next/dynamic";
import { useArea } from "../hooks/useArea";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { TableGeneral } from "../table/general-table";

const columns = [
  { name: "NAME", uid: "name" },

  { name: "STATUS", uid: "status" },
  {
    name: "CREATED BY",
    uid: "created_by",
  },
  {
    name: "CREATED AT",
    uid: "created_at",
  },
  { name: "ACTIONS", uid: "actions" },
];

const Component = () => {
  const [page, setPage] = useState(1);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const { areas, loading, totalPage, refetch } = useArea(
    auth_token?.access,
    page,
    router,
    toast,
    removeUser
  );

  console.log(areas);

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
      <Text h3>Areas</Text>
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
            placeholder="Search areas"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          {/* <AddUser refetch={refetch} /> */}
        </Flex>
      </Flex>

      {loading ? (
        <Loading style={{ marginTop: "40px" }} />
      ) : (
        <TableGeneral
          columns={columns}
          data={areas}
          totalPages={totalPage}
          setPage={setPage}
          refetch={refetch}
        />
      )}
    </Flex>
  );
};

export const Area = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
