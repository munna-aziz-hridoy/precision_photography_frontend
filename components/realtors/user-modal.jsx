import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";
import { EyeIcon } from "../icons/table/eye-icon";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const Component = ({
  isUpdate = false,
  visible,
  setVisible,
  handleSubmit,
  prevData = null,
}) => {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [broker_logo, setBroker_logo] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!visible) {
      setFull_name("");
      setEmail("");
      setPhone_number("");
      setAddress("");
      setCompany_name("");
      setWebsite("");
      setBio("");
      setPassword("");
    }
  }, [visible]);

  useEffect(() => {
    setFull_name(prevData?.full_name || "");
    setEmail(prevData?.email || "");
    setPhone_number(prevData?.phone_number || "");
    setPhone_number(prevData?.phone_number || "");
    setAddress(prevData?.address || "");
    setCompany_name(prevData?.company_name || "");
    setWebsite(prevData?.Website || "");
    setBio(prevData?.bio || "");
    setImageUrl(prevData?.broker_logo || "");
  }, [prevData]);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      width="600px"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header css={{ justifyContent: "start" }}>
        <Text id="modal-title" h4>
          {isUpdate ? "Edit User" : "Add New User"}
        </Text>
      </Modal.Header>
      <Divider css={{ my: "$5" }} />
      <Modal.Body css={{ py: "$10" }}>
        <Flex
          direction={"column"}
          css={{
            flexWrap: "wrap",
            gap: "$8",
            "@lg": { flexWrap: "nowrap", gap: "$8" },
          }}
        >
          {isUpdate && (
            <Flex
              direction="column"
              justify="center"
              align="center"
              css={{ gap: "$4", position: "relative" }}
            >
              {imageUrl ? (
                <div style={{ position: "relative" }}>
                  <Avatar src={imageUrl} css={{ size: "$20", zIndex: "$1" }} />
                  <RxCross2
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "5px",
                      zIndex: "100",
                      background: "#ff6f6f",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => setImageUrl("")}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80px",
                    height: "80px",
                    background: "#e3e3e3",
                    borderRadius: "50%",
                    opacity: 1,
                    cursor: "pointer",
                  }}
                >
                  <AiOutlineCloudUpload color="gray" fontSize={30} />
                </div>
              )}

              <input
                onChange={(e) => {
                  const file = e.target.files[0];

                  setBroker_logo(file);

                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImageUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                type="file"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "red",
                  display: "inline-block",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: 100,
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
              <Text size={12} b>
                Upload broker logo
              </Text>
            </Flex>
          )}

          <Flex
            css={{
              gap: "$6",
              flexWrap: "wrap",
              "@lg": { flexWrap: "nowrap" },
            }}
          >
            <Input
              label="Full Name"
              bordered
              clearable
              fullWidth
              size="md"
              placeholder="Full Name"
              onChange={(e) => setFull_name(e.target.value)}
              defaultValue={prevData?.full_name}
              value={full_name}
            />
          </Flex>

          <Flex
            css={{
              gap: "$6",
              flexWrap: "wrap",
              "@lg": { flexWrap: "nowrap" },
            }}
          >
            <Input
              label="Email"
              clearable
              bordered
              fullWidth
              size="md"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={prevData?.email}
              value={email}
            />
            {isUpdate && (
              <Input
                label="Phone Number"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Phone Number"
                onChange={(e) => setPhone_number(e.target.value)}
                defaultValue={prevData?.phone_number}
                value={phone_number}
              />
            )}
          </Flex>
          {!isUpdate && (
            <Flex direction="column" css={{ gap: "$4" }}>
              <Input.Password
                label="Password"
                visibleIcon={<EyeIcon fill="#919191" />}
                hiddenIcon={<EyeIcon fill="#919191" />}
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Flex>
          )}
          {isUpdate && (
            <Flex
              css={{
                gap: "$6",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Company"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Company"
                onChange={(e) => setCompany_name(e.target.value)}
                defaultValue={prevData?.company_name}
                value={company_name}
              />
              <Input
                label="Website"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Website"
                onChange={(e) => setWebsite(e.target.value)}
                defaultValue={prevData?.website}
                value={website}
              />
            </Flex>
          )}
          {isUpdate && (
            <Flex>
              <Input
                label="Address"
                clearable
                bordered
                fullWidth
                size="md"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={prevData?.address}
                value={address}
              />
            </Flex>
          )}
          {isUpdate && (
            <Flex>
              <Textarea
                fullWidth
                label="Bio"
                placeholder="Bio"
                bordered
                onChange={(e) => setBio(e.target.value)}
                defaultValue={prevData?.bio}
                value={bio}
              />
            </Flex>
          )}
        </Flex>
      </Modal.Body>
      <Divider css={{ my: "$5" }} />
      <Modal.Footer>
        <Button
          auto
          onClick={() =>
            handleSubmit({
              full_name,
              email,
              phone_number,
              address,
              company_name,
              website,
              bio,
              password,
              broker_logo,
            })
          }
        >
          {isUpdate ? "Edit User" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const UserModal = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
