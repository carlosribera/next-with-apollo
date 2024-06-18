"use client";

import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import { IconEdit } from "../components/icons";
import DeleteButton from "./delete/page";

export const GET_PURCHASES = gql`
  query {
    getAllPurchases {
      id
      idSupplier
      precioTotal
    }
  }
`;

function UpdatePurchasePage() {
  const { data, loading, error } = useQuery(GET_PURCHASES);

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
    { name: "ID COMPRA", selector: (row) => row.id },
    { name: "IDSUPLIER", selector: (row) => row.idSupplier },
    { name: "PRECIO TOTAL", selector: (row) => row.precioTotal },
    {
      name: "ACCIONES", // Agregar esta línea
      cell: (row) => (
        <div className="flex justify-center items-center gap-2">
          <Link href={`/purchases/update?id=${row.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 text-sm font-bold rounded flex items-center">
              {IconEdit}
            </button>
          </Link>
          <div className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 text-sm font-bold rounded flex items-center">
            <DeleteButton id={row.id} />
          </div>
        </div>
      ),
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
      <div className="rounded-t-2xl">
        <div className="flex gap-8 justify-center">
          <h2 className="text-3xl font-bold text-center text-black mb-10">
            Lista de Compra
          </h2>
          <Link href="/purchases/create">
            <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl">
              Agregar
            </button>
          </Link>
        </div>

        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={purchases}
          pagination
          paginationPerPage={6}
          fixedHeader
          highlightOnHover
          noDataComponent="No existen compras"
        />
      </div>
    </div>
  );
}
export default UpdatePurchasePage;
