import React, { useEffect, useState } from "react";

import { Button, Divider, Input, Text, Image } from "@nextui-org/react";

import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Box } from "../styles/box";
import { Gallery } from "../gallery";

const Jodit = dynamic(() => import("jodit-react"), { ssr: false });

const Component = ({ handleSubmit, prevData = null, isUpdate }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [cover_image, setCover_image] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState(null);
  const [video_tour_link, setVideo_tour_link] = useState("");
  const [virtual_tour_link, setVirtual_tour_link] = useState("");

  useEffect(() => {
    setImageUrl(prevData?.cover_image || "");
    setName(prevData?.name || "");
    setDescription(prevData?.description || "");
    setGallery(prevData?.gallery?.id || null);
    setVideo_tour_link(prevData?.video_tour_link || "");
    setVirtual_tour_link(prevData?.virtual_tour_link || "");
  }, [prevData]);

  return (
    <Box css={{ p: "$12" }}>
      <Divider css={{ my: "$5" }} />

      <Flex
        css={{
          flexDirection: "column",
          "@lg": {
            flexDirection: "row",
          },
        }}
        justify="space-between"
        align="start"
      >
        <Flex
          direction={"column"}
          css={{
            flexWrap: "wrap",
            gap: "$8",
            width: "100%",
            "@lg": {
              flexWrap: "nowrap",
              gap: "$8",
              width: isUpdate ? "60%" : "100%",
            },
          }}
        >
          <Flex
            direction="column"
            justify="start"
            align="center"
            css={{ gap: "$4", position: "relative" }}
          >
            {imageUrl ? (
              <div style={{ position: "relative" }}>
                <Image
                  width={320}
                  height={180}
                  src={imageUrl}
                  alt="Default Image"
                  objectFit="cover"
                />
                <RxCross2
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-2px",
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
                  width: "320px",
                  height: "180px",
                  background: "#e3e3e3",
                  borderRadius: "6px",
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

                setCover_image(file);

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
                width: "320px",
                height: "180px",
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
              Cover Image
            </Text>
          </Flex>

          <Flex
            css={{
              gap: "$6",
              flexWrap: "wrap",
              "@lg": { flexWrap: "nowrap" },
            }}
          >
            <Input
              label="Name"
              bordered
              clearable
              fullWidth
              size="md"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={prevData?.name}
              value={name}
            />
          </Flex>
          <Flex direction={"column"} css={{ width: "100%" }}>
            <Text>Description</Text>
            <Jodit
              config={{
                buttons: [
                  "fontsize",
                  "bold",
                  "italic",
                  "underline",
                  "|",
                  "ul",
                  "|",
                  "link",
                  "|",
                  "align",
                  "|",
                ],
                toolbarAdaptive: false,
                readonly: false,
                sizeLG: 900,
                sizeMD: 700,
                sizeSM: 400,
                sizeSM: 400,
                showPathInStatusBar: false,
              }}
              onBlur={(newContent) => {
                setDescription(newContent);
              }}
              value={description}
              // onChange={(newContent) => {
              //   setDescription(newContent);
              // }}
            />
          </Flex>

          <Flex>
            <Gallery prevGallery={gallery} setGallery={setGallery} />
          </Flex>

          <Flex
            css={{
              gap: "$6",
              flexWrap: "wrap",
              "@lg": { flexWrap: "nowrap" },
            }}
          >
            <Input
              label="Video tour link"
              clearable
              bordered
              fullWidth
              size="md"
              placeholder="Video tour link"
              onChange={(e) => setVideo_tour_link(e.target.value)}
              defaultValue={prevData?.video_tour_link}
              value={video_tour_link}
            />
            <Input
              label="Virtual tour link"
              clearable
              bordered
              fullWidth
              size="md"
              placeholder="Virtual tour link"
              onChange={(e) => setVirtual_tour_link(e.target.value)}
              defaultValue={prevData?.virtual_tour_link}
              value={virtual_tour_link}
            />
          </Flex>
          {!isUpdate && (
            <Button
              css={{
                marginTop: "$10",
              }}
              onClick={() =>
                handleSubmit({
                  name,
                  cover_image,
                  description,
                  gallery,
                  video_tour_link,
                  virtual_tour_link,
                })
              }
              style={{ width: "200px" }}
            >
              {isUpdate ? "Update" : "Submit"}
            </Button>
          )}
        </Flex>
        {isUpdate && (
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              width: "100%",
              "@lg": { flexWrap: "nowrap", gap: "$8" },
              "@md": { width: "40%" },
            }}
          >
            <Flex
              direction={"column"}
              css={{
                gap: "$4",
                p: "$12",

                mt: "$10",
              }}
            >
              <Text size={14} b>
                Status: {prevData?.is_active ? "Active" : "Inactive"}
              </Text>
              <Text size={14} b>
                Created By: {prevData?.created_by?.full_name}
              </Text>
              <Text size={14} b>
                Created At: {prevData?.created_at?.split(" ")[0]}
              </Text>
              <Button
                onClick={() =>
                  handleSubmit({
                    name,
                    cover_image,
                    description,
                    gallery,
                    video_tour_link,
                    virtual_tour_link,
                  })
                }
                auto
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export const CommunityForm = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
