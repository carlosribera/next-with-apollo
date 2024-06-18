"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";
import DataTable from "react-data-table-component";

export const GET_SALES = gql`
  query {
    getAllSales {
      id
      clientId
      totalPrice
    }
  }
`;

function SalesPage() {
  const { data, loading, error } = useQuery(GET_SALES);

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

  const sales = data?.getAllSales || [];

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "CLIENTE",
      selector: (row) => row.clientId,
    },
    {
      name: "PRECIO TOTAL",
      selector: (row) => row.totalPrice,
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
      {sales.length > 0 ? (
        <div className="rounded-t-2xl">
          <div className="flex gap-8 justify-center">
            <h2 className="text-3xl font-bold text-center text-black mb-10">
              LISTA DE VENTAS
            </h2>
            <Link href="/sales/create">
              <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl">
                Agregar
              </button>
            </Link>
          </div>
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={sales}
            pagination
            paginationPerPage={6}
            fixedHeader
            highlightOnHover
            noDataComponent="No existen Clientes registrados"
          />
        </div>
      ) : (
        <p>No hay registros de ventas</p>
      )}
    </div>
  );
}
export default SalesPage;
