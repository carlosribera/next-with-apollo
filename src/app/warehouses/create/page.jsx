"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { GET_WAREHOUSES } from "../page";

const CREATE_WAREHOUSE = gql`
  mutation CreateWarehouse($warehouseInput: WarehouseInput!) {
    createWarehouse(warehouseInput: $warehouseInput) {
    name,
    location,
    phone,
    }
  }
`;
export default function CreateWarehouse() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
  });

  const [createWarehouse] = useMutation(CREATE_WAREHOUSE, {
    
    refetchQueries: [{ query: GET_WAREHOUSES }],
    onCompleted: () => {
      router.push("/warehouses");
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
    createWarehouse({
      variables: {
        warehouseInput: {
          name: formData.name,
          location: formData.location,
          phone: formData.phone,
        },
      },
    });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Agregar Almacen
        </h2>
        
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Telefono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Agregar
          </button>
        </form>
      </div>
    </>
  );
}
