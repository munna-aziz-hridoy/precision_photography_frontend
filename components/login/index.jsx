import React, { useState } from "react";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
} from "@nextui-org/react";
import Link from "next/link";

import toast from "react-hot-toast";

import { Mail } from "../icons/accounts/mail-icon";
import { Password } from "../icons/accounts/password-icon";

import logoDark from "@/assets/logo_black.png";
import logoLight from "@/assets/logo_white.png";
import { useTheme } from "@nextui-org/react";

import { login, getUser } from "@/api";
import useAuthStore from "@/store/authStore";
import dynamic from "next/dynamic";

import { Flex } from "../styles/flex";
import { useRouter } from "next/router";
import { EyeIcon } from "../icons/table/eye-icon";

function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { addUser, addToken } = useAuthStore();

  const { isDark } = useTheme();

  const handleLogin = () => {
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    const user = {
      email,
      password,
    };

    login(user).then((response) => {
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
            <img
              src={isDark ? logoLight.src : logoDark.src}
              alt=""
              width={200}
              height={200}
            />
          </Flex>

          <Text
            size={30}
            color="primary"
            weight="medium"
            css={{ textAlign: "center" }}
          >
            Login
          </Text>
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
          <Input.Password
            contentLeft={<Password fill="#969696" />}
            visibleIcon={<EyeIcon fill="#919191" />}
            hiddenIcon={<EyeIcon fill="#919191" />}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            css={{ mb: "6px" }}
          />

          <Spacer y={1} />
          <Button onClick={handleLogin} color="primary">
            Sign in
          </Button>
          <Spacer y={1} />
        </Card>
      </Container>
    </div>
  );
}

export const LoginForm = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
