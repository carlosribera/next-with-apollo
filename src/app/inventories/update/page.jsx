"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_INVENTORIES } from "../page";

const UPDATE_INVENTORY = gql`
  mutation UpdateInventory($id: ID!, $inventoryInput: InventoryInput!) {
    updateInventory(id: $id, inventoryInput: $inventoryInput) {
      warehouseId
      productId
      quantity
      section
    }
  }
`;
export default function UpdateInventory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    warehouseId: "",
    productId: "",
    quantity: "",
    section: "",
  });

  const [updateInventory] = useMutation(UPDATE_INVENTORY, {
    refetchQueries: [{ query: GET_INVENTORIES }],

    onCompleted: () => {
      router.push("/inventories");
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

    try {
      await updateInventory({
        variables: {
          id,
          inventoryInput: {
            warehouseId: formData.warehouseId,
            productId: formData.productId,
            quantity: parseInt(formData.quantity),
            section: formData.section,
          },
        },
      });
    } catch (err) {
      console.error("Error actualizando el cliente", err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Actualizar Inventario
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="warehouseId" className="block text-gray-700">
              Id Almacen
            </label>
            <input
              type="text"
              id="warehouseId"
              name="warehouseId"
              value={formData.warehouseId}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productId" className="block text-gray-700">
              Id Producto
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              Cantidad
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="section" className="block text-gray-700">
              Seccion
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
}
