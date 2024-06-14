"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";
import DataTable from "react-data-table-component";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      imageUrl
      description
    }
  }
`;

function ProductPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  // console.log(data)

  if (loading)
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.products || [];

  const columns = [
    { name: "NOMBRE", selector: (row) => row.name },
    { name: "PRECIO", selector: (row) => row.price },
    { name: "DESCRIPCION", selector: (row) => row.description },
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
      {products.length > 0 ? (
        <div className="rounded-t-2xl">
          <div className="flex gap-8">
            <h2 className="text-3xl font-bold text-center text-black mb-5">
              LISTA DE PRODUCTOS
            </h2>
            <Link href="/products/create">
              <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl">
                Agregar
              </button>
            </Link>
          </div>

          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={products}
            pagination
            paginationPerPage={6}
            fixedHeader
            highlightOnHover
            noDataComponent="No existen productos"
          />
        </div>
      ) : (
        <p>No users</p>
      )}
    </div>
  );
}
export default ProductPage;
