import React from "react";

import { Modal, Button, Text } from "@nextui-org/react";
import useAuthStore from "@/store/authStore";
import { deleteRealtors } from "@/api/realtors";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const ConfirmModal = ({ visible, setVisible, id, refetch, setEditedUser }) => {
  const closeHandler = () => {
    setVisible(false);
  };

  const { auth_token, removeUser } = useAuthStore();

  const router = useRouter();

  const handleDelete = () => {
    deleteRealtors(id, auth_token?.access).then((res) => {
      if (res.status === 204) {
        toast.success("User Deleted successfully");
        refetch && refetch();
        setEditedUser(null);
        setVisible(false);
      } else if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Text h2 size={24} color="error" style={{ textAlign: "center" }}>
          Are you sure you want to delete?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button color="success" auto onPress={handleDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
