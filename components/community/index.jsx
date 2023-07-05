import React, { Fragment, useState } from "react";

import { Input, Text, Loading, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { TableGeneral } from "../table/general-table";

import ConfirmModal from "./confirm-modal";

import { useCommunity } from "../hooks/useCommunity";

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

  const [editedCommunity, setEditedCommunity] = useState("");

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const { communities, loading, totalPage, refetch } = useCommunity(
    auth_token?.access,
    page,
    router,
    toast,
    removeUser
  );

  const handleEdit = (slug) => {
    router.push(`/community/edit/${slug}`);
  };
  const handleDelete = (id) => {
    setConfirmModalVisible(true);
    setEditedCommunity(id);
  };

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
      <Text h3>Communities</Text>
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
            placeholder="Search community"
          />
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button onClick={() => router.push("/community/add-community")}>
            Add Area
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Loading style={{ marginTop: "40px" }} />
      ) : (
        <Fragment>
          <TableGeneral
            columns={columns}
            data={communities}
            totalPages={totalPage}
            setPage={setPage}
            refetch={refetch}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />

          <ConfirmModal
            visible={confirmModalVisible}
            setVisible={setConfirmModalVisible}
            id={editedCommunity}
          />
        </Fragment>
      )}
    </Flex>
  );
};

export const Community = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
