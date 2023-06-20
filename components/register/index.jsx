import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Container,
} from "@nextui-org/react";

import toast from "react-hot-toast";

import { Mail } from "../icons/accounts/mail-icon";
import { Password } from "../icons/accounts/password-icon";

import logoDark from "@/assets/logo_black.png";
import { register, getUser } from "@/api";
import useAuthStore from "@/store/authStore";

import { Flex } from "../styles/flex";
import { UserIcon } from "../icons/accounts/user-icon";
import Link from "next/link";

import dynamic from "next/dynamic";

const Component = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { addToken, addUser } = useAuthStore();

  const handleRegister = () => {
    if (!fullName) return toast.error("Name is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    const user = {
      full_name: fullName,
      email,
      password,
    };

    register(user).then((response) => {
      const { res, data } = response;

      if (res.status === 401) {
        toast.error(data.detail);
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else if (res.status === 200) {
        addToken(data);

        getUser(data?.access).then((userData) => {
          toast.success("Login successful");
          addUser(userData?.data);
          router.push("/");
        });
      }
    });
  };

  return (
    <div>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "100vh" }}
      >
        <Card css={{ mw: "420px", p: "20px" }} variant="bordered">
          <Flex justify="center" align="center">
            <img src={logoDark.src} alt="" width={200} height={200} />
          </Flex>

          <Text
            size={30}
            color="primary"
            weight="medium"
            css={{ textAlign: "center" }}
          >
            Register
          </Text>
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
            contentLeft={<UserIcon fill="#969696" />}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="#969696" />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={1} />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="#969696" />}
            onChange={(e) => setPassword(e.target.value)}
            css={{ mb: "6px" }}
          />

          <Spacer y={1} />
          <Button onClick={handleRegister}>Sign in</Button>
          <Spacer y={1} />
          <Text size={14}>
            Already have an account ? <Link href="/auth/login">Login</Link>{" "}
          </Text>
        </Card>
      </Container>
    </div>
  );
};

export const RegisterForm = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
