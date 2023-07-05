import React, { Component } from "react";
import { render } from "react-dom";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Image } from "@nextui-org/react";
import { BsX } from "react-icons/bs";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const SortableItem = sortableElement(({ image }) => (
  <div style={{ position: "relative", cursor: "grab" }}>
    <Image src={image?.thumbnail} width={90} height={75} />
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
));

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {children}
    </div>
  );
});

class GalleryGrid extends Component {
  state = this.props.gallery;

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ images }) => {
      const updatedImages = arrayMove(images, oldIndex, newIndex);

      // Update the order numbers based on the new arrangement
      const reorderedImages = updatedImages.map((image, index) => ({
        ...image,
        order: index + 1,
      }));

      this.props.setSortedImages(reorderedImages);

      return {
        images: reorderedImages,
      };
    });
  };

  onImageOrderChange = (modifiedImage) => {
    const { images } = this.state;

    // Find the maximum order number
    const maxOrder = Math.max(...images.map((image) => image.order));

    // Update the order of the modified image
    const updatedImages = images.map((image) => {
      if (image.id === modifiedImage.id) {
        return { ...image, order: maxOrder };
      }
      return image;
    });

    // Update the order numbers of other images
    const reorderedImages = updatedImages.map((image) => ({
      ...image,
      order: image.order > maxOrder ? image.order - 1 : image.order,
    }));

    this.setState({
      images: reorderedImages,
    });
    this.props.setSortedImages(reorderedImages);
  };

  render() {
    const { images } = this.state;

    return (
      <div className="container">
        <SortableContainer onSortEnd={this.onSortEnd} axis="xy">
          {images.map((image, index) => (
            <SortableItem
              key={`image-${image.id}`}
              index={index}
              image={image}
            />
          ))}
        </SortableContainer>
      </div>
    );
  }
}

export default GalleryGrid;
