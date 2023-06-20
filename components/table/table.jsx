import { Table } from "@nextui-org/react";
import React from "react";
import { Box } from "../styles/box";
import { columns } from "./data";
import { RenderCell } from "./render-cell";

import dynamic from "next/dynamic";

const Component = ({ data, setPage, totalPages }) => {
  const users = data?.map((d) => {
    const { id, full_name, phone_number, user_type, company_name, website } = d;
    return { id, full_name, phone_number, user_type, company_name, website };
  });

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
        selectionMode="multiple"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({ user: item, columnKey: columnKey })}
                </Table.Cell>
              )}
            </Table.Row>
          )}
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

export const TableWrapper = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
