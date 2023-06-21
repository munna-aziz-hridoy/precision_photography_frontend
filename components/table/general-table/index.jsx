import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@/components/styles/box";
import { Table, Row, Col, Tooltip, Text, Badge } from "@nextui-org/react";

import { EditIcon } from "@/components/icons/table/edit-icon";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { IconButton } from "../table.styled";

const Component = ({ columns, data, setPage, totalPages }) => {
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="single"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={data}>
          {(item) => {
            return (
              <Table.Row key={item.id}>
                {(columnKey) => {
                  return (
                    <Table.Cell>
                      {columnKey === "actions" ? (
                        <Row
                          justify="center"
                          align="center"
                          css={{ gap: "$8" }}
                        >
                          <Col css={{ d: "flex", justifyContent: "end" }}>
                            <Tooltip color="primary" content="Edit area">
                              <IconButton>
                                <EditIcon size={20} fill="#979797" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                          <Col css={{ d: "flex", justifyContent: "start" }}>
                            <Tooltip color="error" content="Delete area">
                              <IconButton>
                                <DeleteIcon size={20} fill="#FF0080" />
                              </IconButton>
                            </Tooltip>
                          </Col>
                        </Row>
                      ) : columnKey === "created_by" ? (
                        <Text>{item[columnKey]?.full_name}</Text>
                      ) : columnKey === "status" ? (
                        <Badge
                          color={
                            item?.status === "active" ? "success" : "secondary"
                          }
                        >
                          {item[columnKey]}
                        </Badge>
                      ) : (
                        <Text>{item[columnKey]}</Text>
                      )}
                    </Table.Cell>
                  );
                }}
              </Table.Row>
            );
          }}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => setPage(page)}
          total={totalPages}
        />
      </Table>
    </Box>
  );
};

export const TableGeneral = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
