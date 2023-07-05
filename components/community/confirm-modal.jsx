import React from "react";

import { Modal, Button, Text } from "@nextui-org/react";
import useAuthStore from "@/store/authStore";
import {} from "@/api/realtors";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const ConfirmModal = ({ visible, setVisible, id, refetch, setEditedUser }) => {
  const closeHandler = () => {
    setVisible(false);
  };

  const { auth_token, removeUser } = useAuthStore();

  const router = useRouter();

  const handleDelete = () => {};

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
