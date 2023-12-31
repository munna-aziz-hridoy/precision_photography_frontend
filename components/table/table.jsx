import { Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../styles/box";

import { RenderCell } from "./render-cell";

import dynamic from "next/dynamic";
import { UserModal } from "../realtors/user-modal";
import { editRealtors } from "@/api";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ConfirmModal from "../realtors/confirm-modal";

const Component = ({ data, setPage, totalPages, refetch, columns }) => {
  const [visible, setVisible] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

  const [editedUser, setEditedUser] = useState(null);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const users = data?.map((d) => {
    const { id, full_name, phone_number, user_type, company_name, website } = d;
    return { id, full_name, phone_number, user_type, company_name, website };
  });

  const handleUpdate = (updatedData) => {
    const prevData = data.find((d) => d.id === editedUser);

    const {
      full_name,
      phone_number,
      company_name,
      website,
      address,
      email,
      bio,
      broker_logo,
    } = updatedData;

    const realtors_data = new FormData();

    realtors_data.append("full_name", full_name || prevData.full_name);
    realtors_data.append("phone_number", phone_number || prevData.phone_number);
    realtors_data.append("company_name", company_name || prevData.company_name);
    realtors_data.append("website", website || prevData.website);
    realtors_data.append("address", address || prevData.address);
    realtors_data.append("bio", bio || prevData.bio);
    realtors_data.append("email", email || prevData.email);
    broker_logo && realtors_data.append("broker_logo", broker_logo);

    editRealtors(editedUser, realtors_data, auth_token?.access).then(
      (response) => {
        const { res, data } = response;

        if (res.status === 200) {
          setEditedUser(null);
          toast.success("User updated successfully");
          refetch && refetch();
          setVisible(false);
        } else if (res.status === 403) {
          removeUser();
          router.push("/auth/login");
        } else if (res.status === 500) {
          toast.error("Internal server error");
        } else if (res.status === 400) {
          Object.keys(data).forEach((key) => {
            toast.error(data[key][0]);
          });
        } else {
          toast.error(data?.detail || "Something went wrong");
        }
      }
    );
  };

  const handleDelete = (id) => {
    setEditedUser(id);
    setVisibleDeleteModal(true);
  };

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="single"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({
                    user: item,
                    columnKey: columnKey,
                    setVisible: setVisible,
                    setEditedUser: setEditedUser,
                    handleDelete: handleDelete,
                  })}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => setPage(page)}
          total={totalPages}
        />
      </Table>
      <UserModal
        visible={visible}
        setVisible={setVisible}
        isUpdate
        handleSubmit={handleUpdate}
        prevData={data?.find((d) => d.id === editedUser)}
      />
      <ConfirmModal
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
        id={editedUser}
        setEditedUser={setEditedUser}
        refetch={refetch}
      />
    </Box>
  );
};

export const TableWrapper = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
