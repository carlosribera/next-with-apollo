"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";

export const GET_WAREHOUSE = gql`
  query {
    getAllWarehouses {
      id
      name
      location
      phone
    }
  }
`;

function WarehousePage() {
  const { data, loading, error } = useQuery(GET_WAREHOUSE);

  // console.log(data)

  if (loading)
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const warehouses = data?.warehouses || [];
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          LISTA DE ALMACENES
        </h2>
        {/* <Link href="/warehouses/create">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Agregar
          </button>
        </Link> */}
      </div>
      {warehouses.length > 0 ? (
        <table className="rounded-xl shadow-2xl border-none w-6/12 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-3 bg-cyan-800">Nombre</th>
              <th className="py-3 bg-cyan-800">Localizacion</th>
              <th className="py-3 bg-cyan-800">telefono</th>
              <th className="py-3 bg-cyan-800"></th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {warehouses.map((item) => (
              <tr
                key={item.id}
                className="bg-white hover:bg-cyan-100 cursor-pointer duration-100"
              >
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.location}</td>
                <td className="py-3 px-6">{item.phone}</td>
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
        <p>No hay registros de almacenes</p>
      )}
    </div>
  );
}
export default WarehousePage;
