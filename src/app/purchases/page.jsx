"use client";

import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";
import DataTable from "react-data-table-component";

const query = gql`
  query {
    getAllPurchases {
      id
      idSupplier
      precioTotal
    }
  }
`;

function PurchasesPage() {
  const { data, loading, error } = useQuery(query);

  // console.log(data)

  if (loading)
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) {
    if (error.message === "Forbidden") {
      window.location.href = "/dashboard";
    }
  }

  const purchases = data?.getAllPurchases || [];

  const columns = [
    {
      name: "ID PROVEEDOR",
      selector: (row) => row.idSupplier,
    },
    {
      name: "PRECIO TOTAL",
      selector: (row) => row.precioTotal,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#FFFFFF",
        backgroundColor: "#155E75",
      },
    },
  };
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        LISTA DE COMPRAS
      </h2>
      {purchases.length > 0 ? (
        <div className="rounded-t-2xl">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={purchases}
            pagination
            paginationPerPage={6}
            fixedHeader
            highlightOnHover
            noDataComponent="No existen Clientes registrados"
          />
        </div>
      ) : (
        <p>No purchases</p>
      )}
    </div>
  );
}
export default PurchasesPage;
