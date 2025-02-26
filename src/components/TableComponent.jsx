import React from "react";
import DataTable from "react-data-table-component";
 
const TableComponent = ({ data }) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];
 
  return <DataTable columns={columns} data={data} />;
};
 
export default TableComponent;