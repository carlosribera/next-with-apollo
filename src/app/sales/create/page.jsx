"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_SALES } from "../page";

const CREATE_VENTA = gql`
  mutation CreateSale($saleInput: SaleInput!) {
    createSale(saleInput: $saleInput) {
      clientId
      totalPrice
    }
  }
`;
export default function CreateSale() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientId: "",
    totalPrice: "",
  });

  const [createSale] = useMutation(CREATE_VENTA, {
    refetchQueries: [{ query: GET_SALES }],
    onCompleted: () => {
      router.push("/sales");
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    createSale({
      variables: {
        saleInput: {
          clientId: formData.clientId,
          totalPrice: parseFloat(formData.totalPrice),
        },
      },
    });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Agregar Venta
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="clientId" className="block text-gray-700">
              Cliente
            </label>
            <input
              type="text"
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalPrice" className="block text-gray-700">
              Precio Total
            </label>
            <input
              type="text"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
