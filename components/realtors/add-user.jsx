import React, { useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Textarea,
  Checkbox,
} from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { UserModal } from "./user-modal";
import { addRealtors } from "@/api";
import { useRouter } from "next/router";

const Component = ({ refetch }) => {
  const [visible, setVisible] = useState(false);

  const { auth_token, removeUser } = useAuthStore();

  const router = useRouter();

  const handler = () => setVisible(true);

  const handleAddUser = (data) => {
    const { full_name, email, password } = data;

    if (!full_name) return toast.error("Name is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    addRealtors({ full_name, email, password }, auth_token?.access).then(
      (response) => {
        const { res, data } = response;
        if (res.status === 201) {
          toast.success("User added successfully");
          setVisible(false);
          refetch();
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

  return (
    <div>
      <Button auto onClick={handler}>
        Add User
      </Button>

      <UserModal
        visible={visible}
        setVisible={setVisible}
        handleSubmit={handleAddUser}
      />
    </div>
  );
};

export const AddUser = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
