import { Col, Row, User, Text, Tooltip, Badge } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

import { IconButton, StyledBadge } from "./table.styled";

export const RenderCell = ({ user, columnKey }) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {user?.full_name}
        </Text>
      );
    case "phone_number":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {cellValue}
            </Text>
          </Row>
          <Row>
            <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
              {user.team}
            </Text>
          </Row>
        </Col>
      );
    case "user_type":
      return (
        // @ts-ignore

        <Badge color={user?.user_type === "admin" ? "success" : "secondary"}>
          {" "}
          {user?.user_type}
        </Badge>
      );

    case "company_name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {user?.company_name}
        </Text>
      );
    case "company_name":
      return (
        <Text b size={14} css={{ tt: "capitalize" }}>
          {user?.website}
        </Text>
      );

    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details">
              <IconButton onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => console.log("Edit user", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => console.log("Delete user", user.id)}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );

    default:
      return cellValue;
  }
};
