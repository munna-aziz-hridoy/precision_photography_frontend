import React, { Fragment, useState } from "react";

import { Input, Text, Loading, Button } from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";
import { useArea } from "../hooks/useArea";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { TableGeneral } from "../table/general-table";

import ConfirmModal from "./confirm-modal";

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

  const [editedArea, setEditedArea] = useState("");

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const { areas, loading, totalPage, refetch } = useArea(
    auth_token?.access,
    page,
    router,
    toast,
    removeUser
  );

  const handleEdit = (slug) => {
    router.push(`/areas/edit/${slug}`);
  };
  const handleDelete = (id) => {
    setEditedArea(id);
    setConfirmModalVisible(true);
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
        </Flex>
        <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
          <Button onClick={() => router.push("/areas/add-area")}>
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
            data={areas}
            totalPages={totalPage}
            setPage={setPage}
            refetch={refetch}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />

          <ConfirmModal
            visible={confirmModalVisible}
            setVisible={setConfirmModalVisible}
            id={editedArea}
          />
        </Fragment>
      )}
    </Flex>
  );
};

export const Area = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
