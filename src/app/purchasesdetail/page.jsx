"use client";

import { gql, useQuery } from "@apollo/client";
import {IconDelete, IconEdit} from '../components/icons'
import DataTable from "react-data-table-component";

const query = gql`
query {
  detailPurchases {
    id
    idProducto
    cantidad
    precioProducto
  }
}
`;

function DetailPurchasesPage() {
  const { data, loading, error } = useQuery(query);

  // console.log(data)

  if (loading) return <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const detailPurchases = data?.detailPurchases || [];

  const columns = [
    {
      name: "ID PRODUCTO",
      selector: (row) => row.idProducto,
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.cantidad,
    },
    {
      name: "PRECIO PRODUCTO",
      selector: (row) => row.precioProducto,
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
      <h2 className="text-3xl font-bold text-center text-black mb-10">DETALLE DE COMPRAS</h2>
      {detailPurchases.length > 0 ? (
      <div className="rounded-t-2xl">
        <DataTable
        customStyles={customStyles}
        columns={columns}
        data={detailPurchases}
        pagination
        paginationPerPage={6}
        fixedHeader
        highlightOnHover
        noDataComponent="No existen Clientes registrados"
      />
    </div>
      ) : (
        <p>No detailPurchases</p>
      )}
    </div>
  );
}
export default DetailPurchasesPage;
