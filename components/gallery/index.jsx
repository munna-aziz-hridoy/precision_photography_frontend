import React, { useEffect, useState } from "react";

import { Button, Divider, Image, Loading, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";

import dynamic from "next/dynamic";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { GalleryModal } from "./gallery-modal";
import { useGalleryDetails } from "../hooks/useGalleryDetails";

import { AiFillFolderOpen } from "react-icons/ai";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

import GalleryGrid from "./gallery-grid";
import { BsX } from "react-icons/bs";
import { addImageToGallery, applyManualSort, applySortByName } from "@/api";

const Component = ({ prevGallery = null, setGallery }) => {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [sortedImages, setSortedImages] = useState([]);

  const [newImages, setNewImages] = useState(null);
  const [newImagesUrl, setNewImagesUrl] = useState([]);

  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setSelectedGallery(prevGallery);
  }, [prevGallery]);

  const { gallery, loading, refetch } = useGalleryDetails(
    auth_token?.access,
    selectedGallery,
    router,
    toast,
    removeUser
  );

  const handleUploadImages = () => {
    const gallery_data = new FormData();

    if (!newImages) return toast.error("please select images");

    gallery_data.append("gallery_id", selectedGallery);

    newImages.forEach((image) => {
      gallery_data.append("images", image);
    });

    addImageToGallery(auth_token?.access, gallery_data).then((response) => {
      const { res, data } = response;

      if (res.status === 200) {
        toast.success("Images added successfully");
        setNewImages(null);
        setNewImagesUrl([]);
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
    });
  };

  const handleApplySort = () => {
    const sorted = sortedImages?.map((img) => ({
      id: img.id,
      order: img.order,
    }));
    const data = {
      gallery_id: selectedGallery,
      images: sorted,
    };

    applyManualSort(auth_token?.access, data).then((response) => {
      const { res, data } = response;

      if (res.status === 200) {
        toast.success("Images Sorted successfully");
        setSortedImages([]);
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
    });
  };

  const handleAppyNameSort = () => {
    const data = {
      gallery_id: selectedGallery,
      sort_by_name: true,
    };

    applySortByName(auth_token?.access, data).then((response) => {
      const { res, data } = response;

      if (res.status === 200) {
        toast.success("Images Sorted successfully");
        setSortedImages([]);
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
    });
  };

  return (
    <Flex direction={"column"}>
      <GalleryModal
        setSelectedGallery={setSelectedGallery}
        setGallery={setGallery}
      />

      {loading ? (
        <Loading css={{ mt: "$10" }} />
      ) : (
        <div>
          <Text
            h4
            css={{
              mt: "$10",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <AiFillFolderOpen fontSize={35} /> {gallery?.name}
          </Text>

          {gallery && (
            <GalleryGrid gallery={gallery} setSortedImages={setSortedImages} />
          )}

          {newImages && (
            <>
              <Divider css={{ mb: "$5", mt: "$20" }} />
              <Flex align="center" wrap={"wrap"} css={{ gap: "$4" }}>
                {newImagesUrl.map((url) => {
                  return (
                    <div style={{ position: "relative", cursor: "grab" }}>
                      <Image src={url} width={80} height={65} />
                      <BsX
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "-5px",
                          background: "#ff5252",
                          borderRadius: "50%",
                          cursor: "pointer",
                          color: "#fff",
                        }}
                      />
                    </div>
                  );
                })}
              </Flex>
              <Divider css={{ mt: "$5" }} />
            </>
          )}

          {gallery && (
            <Flex align="center" css={{ gap: "$8", mt: "$10" }}>
              <Flex
                align="center"
                style={{
                  border: "2px solid #cecece",
                  borderRadius: "14px",
                  padding: "0 10px",
                  background: "#cecece",
                  position: "relative",
                  width: "200px",
                  height: "50px",

                  cursor: "pointer",
                }}
              >
                <input
                  style={{ opacity: 0, zIndex: 10, cursor: "pointer" }}
                  width={200}
                  height={50}
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;

                    const fileArr = Object.keys(files).map((key) => files[key]);

                    const fileUrls = fileArr.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setNewImagesUrl(fileUrls);

                    setNewImages(fileArr);
                  }}
                />
                <Flex
                  align="center"
                  justify="center"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    gap: "10px",
                    zIndex: 5,
                  }}
                >
                  <MdOutlineDriveFolderUpload fontSize={30} />
                  <Text h6 css={{ mt: "$8" }}>
                    Upload Images
                  </Text>
                </Flex>
              </Flex>
              <Button onClick={handleUploadImages} size={"lg"}>
                Upload
              </Button>
            </Flex>
          )}

          {gallery && (
            <Flex css={{ mt: "$10", gap: "$8" }}>
              <Button onClick={handleAppyNameSort} color={"gradient"}>
                Sort by name
              </Button>
              <Button
                onClick={handleApplySort}
                disabled={sortedImages?.length === 0 ? true : false}
                color={"secondary"}
              >
                Apply sorting
              </Button>
            </Flex>
          )}
        </div>
      )}

      {gallery?.images?.length === 0 && <Text>No Images</Text>}
    </Flex>
  );
};

export const Gallery = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
