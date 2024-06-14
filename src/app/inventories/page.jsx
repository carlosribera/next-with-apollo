"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";

export const GET_INVENTORIES = gql`
  query {
    getAllInventories {
      id
      warehouseId
      productId
      quantity
      section
    }
  }
`;

function InventoryPage() {
  const { data, loading, error } = useQuery(GET_INVENTORIES);

  // console.log(data)

  if (loading)
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const inventories = data?.inventories || [];
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          LISTA DE INVENTARIOS
        </h2>
        {/* <Link href="/inventories/create">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Agregar
          </button>
        </Link> */}
      </div>
      {inventories.length > 0 ? (
        <table className="rounded-xl shadow-2xl border-none w-6/12 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-3 bg-cyan-800">Id Almacen</th>
              <th className="py-3 bg-cyan-800">Id Producto</th>
              <th className="py-3 bg-cyan-800">Cantidad</th>
              <th className="py-3 bg-cyan-800">Seccion</th>
              <th className="py-3 bg-cyan-800"></th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {inventories.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-cyan-100 cursor-pointer duration-100"
              >
                <td className="py-3 px-6">{item.warehouseId}</td>
                <td className="py-3 px-6">{item.productId}</td>
                <td className="py-3 px-6">{item.quantity}</td>
                <td className="py-3 px-6">{item.section}</td>
                <td className="py-3 px-6 flex gap-3 justify-center items-center">
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white rounded px-3 py-3">
                    {IconEdit}
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-3">
                    {IconDelete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay registros de inventario</p>
      )}
    </div>
  );
}
export default InventoryPage;
