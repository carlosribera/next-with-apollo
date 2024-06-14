"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import { GET_SUPPLIERS } from "../page";

const CREATE_SUPPLIER = gql`
  mutation CreateSupplier($supplierInput: SupplierInput!) {
    createSupplier(supplierInput: $supplierInput) {
      name
      nit
      telefono
    }
  }
`;
export default function CreateSupplier() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    telefono: "",
  });

  const [createSupplier] = useMutation(CREATE_SUPPLIER, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
    onCompleted: () => {
      router.push("/supplier");
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
      await createSupplier({
        variables: {
          supplierInput: {
            name: formData.name,
            nit: formData.nit,
            telefono: formData.telefono,
          },
        },
      });
    } catch(err) {
      console.error('Error creando el proveedor', err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        
          <h2 className="text-3xl font-bold text-center text-black mb-10">
            Agregar Proveedor
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
            <label htmlFor="nit" className="block text-gray-700">
              nit
            </label>
            <input
              type="text"
              id="nit"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-gray-700">
              telefono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
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
