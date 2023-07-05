import React, { useState } from "react";

import { Button, Input, Loading, Modal, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { useGallery } from "../hooks/useGallery";
import { BsCheckLg, BsX } from "react-icons/bs";
import { addGallery } from "@/api";

const Component = ({ setSelectedGallery, setGallery }) => {
  const [page, setPage] = useState(1);

  const [visible, setVisible] = useState(false);

  const [isAddGallery, setIsAddGallery] = useState(false);
  const [galleryName, setGalleryName] = useState("");

  const [focusedGallery, setFocusedGallery] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const { galleries, loading, totalPage, refetch } = useGallery(
    auth_token?.access,
    page,
    router,
    toast,
    removeUser
  );

  const handleCreateGallery = () => {
    if (!galleryName)
      return toast.error("Please specify a name for your gallary");

    addGallery(auth_token?.access, { name: galleryName }).then((response) => {
      const { res, data } = response;

      if (res.status === 201) {
        toast.success("Gallery Created successfully");
        setIsAddGallery(false);
        setGalleryName("");
        refetch();
      } else if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else {
        toast.error(data.detail || "Something went wrong");
      }
    });
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Flex direction={"column"}>
      <Button style={{ background: "#000" }} onClick={() => setVisible(true)}>
        Browse Gallery
      </Button>
      <Modal
        closeButton
        open={visible}
        onClose={closeHandler}
        width="800px"
        css={{
          p: "$10",
        }}
      >
        <Flex
          justify={"between"}
          align={"center"}
          css={{
            mt: "$10",
          }}
        >
          <Text>Gallery</Text>
          <Button size={"md"} onClick={() => setIsAddGallery(true)}>
            Add Gallery
          </Button>
        </Flex>
        {isAddGallery ? (
          <Flex align={"center"} css={{ mt: "$10", gap: "$6" }}>
            <Input
              labelLeft="Name"
              clearable
              bordered
              fullWidth
              size="md"
              onChange={(e) => setGalleryName(e.target.value)}
              value={galleryName}
            />
            <Button
              size={"sm"}
              color="success"
              css={{ px: "$1", minWidth: "40px" }}
              onClick={handleCreateGallery}
            >
              <BsCheckLg fontSize={26} />
            </Button>
            <Button
              onClick={() => {
                setGalleryName("");
                setIsAddGallery(false);
              }}
              size={"sm"}
              color="error"
              css={{ px: "$1", py: "$4", minWidth: "40px" }}
            >
              <BsX fontSize={26} />
            </Button>
          </Flex>
        ) : (
          <Input
            labelLeft="Search"
            clearable
            bordered
            fullWidth
            size="md"
            css={{
              mt: "$10",
            }}
          />
        )}

        {loading && <Loading css={{ mt: "$10" }} />}

        {galleries?.map((gallery, index) => (
          <Text
            onClick={() => setFocusedGallery(gallery.id)}
            css={{
              textAlign: "left",
              p: "$4",
              border: "2px solid #d2d2d2",
              mt: "$4",
              borderRadius: "14px",
              background:
                focusedGallery === gallery.id ? "$primary" : "#f5f5f5",
              cursor: "pointer",
              color: focusedGallery === gallery.id ? "#fff" : "$primary",
            }}
          >
            {gallery?.name}
          </Text>
        ))}
        <Flex justify={"between"} css={{ mt: "$12" }}>
          <div />
          <Button
            onClick={() => {
              setSelectedGallery(focusedGallery);
              setGallery(focusedGallery);
              setVisible(false);
            }}
            size={"md"}
          >
            Select
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
};

export const GalleryModal = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
