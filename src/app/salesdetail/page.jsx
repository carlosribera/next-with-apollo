"use client";

import { gql, useQuery } from "@apollo/client";
import { IconDelete, IconEdit } from "../components/icons";

const GET_DETAIL_SALES = gql`
  query {
    getAllSaleDetails {
      id
      saleId
      productId
      quantity
      productPrice
      workOrderId
    }
  }
`;

function DetailSalesPage() {
  const { data, loading, error } = useQuery(GET_DETAIL_SALES);

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

  const detailSales = data?.detailSales || [];
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        DETALLE DE COMPRAS
      </h2>

      {detailSales.length > 0 ? (
        <table className="rounded-xl shadow-2xl border-none w-6/12 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-3 bg-cyan-800">Id Venta</th>
              <th className="py-3 bg-cyan-800">Id Producto</th>
              <th className="py-3 bg-cyan-800">Cantidad</th>
              <th className="py-3 bg-cyan-800">Precio Producto</th>
              <th className="py-3 bg-cyan-800">Id Orden</th>
              <th className="py-3 bg-cyan-800"></th>
            </tr>
          </thead>
          <tbody className="text-cyan-900 text-center">
            {detailSales.map((detail) => (
              <tr
                key={detail.id}
                className="bg-white hover:bg-cyan-100 cursor-pointer duration-100"
              >
                <td className="py-3 px-6">{detail.salesId}</td>
                <td className="py-3 px-6">{detail.idProducto}</td>
                <td className="py-3 px-10">{detail.quantity}</td>
                <td className="py-3 px-10">{detail.productPrice}</td>
                <td className="py-3 px-10">{detail.workOrderId}</td>
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
        <p className="text-2sm font-bold text-center text-black">
          No tiene campos
        </p>
      )}
    </div>
  );
}
export default DetailSalesPage;
