"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";
import DataTable from "react-data-table-component";

export const GET_SUPPLIERS = gql`
  query {
    suppliers {
      id
      name
      nit
      telefono
    }
  }
`;

function SupplierPage() {
  const { data, loading, error } = useQuery(GET_SUPPLIERS);

  // console.log(data)

  if (loading)
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const suppliers = data?.suppliers || [];

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.name,
    },
    {
      name: "NIT",
      selector: (row) => row.nit,
    },
    {
      name: "TELEFONO",
      selector: (row) => row.telefono,
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
      {suppliers.length > 0 ? (
        <div className="rounded-t-2xl">
          <div className="flex gap-4">
            <h2 className="text-3xl font-bold text-center text-black mb-10">
              LISTA DE PROVEEDORES
            </h2>
            <Link href="/supplier/create">
              <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl">
                Agregar
              </button>
            </Link>
          </div>
            <DataTable
              customStyles={customStyles}
              columns={columns}
              data={suppliers}
              pagination
              paginationPerPage={6}
              fixedHeader
              highlightOnHover
              noDataComponent="No existen Clientes registrados"
            />
        </div>
      ) : (
        <p>No suppliers</p>
      )}
    </div>
  );
}
export default SupplierPage;
