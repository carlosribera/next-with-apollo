"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_SUPPLIERS } from "../page";

const UPDATE_SUPPLIER = gql`
  mutation UpdateSupplier($id: ID!, $supplierInput: SupplierInput!) {
    updateSupplier(id: $id, supplierInput: $supplierInput) {
      name
      nit
      phone
    }
  }
`;
export default function UpdateSupplier() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    phone: "",
  });

  const [updateSupplier ] = useMutation(UPDATE_SUPPLIER, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
    
    onCompleted: () => {
        router.push("/suppliers");
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
      await updateSupplier({
        variables: {
          id,
          supplierInput: {
            name: formData.name,
            nit: formData.nit,
            phone: formData.phone,
          },
        },
      });
    } catch(err) {
      console.error('Error actualizando el proveedor', err);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        
          <h2 className="text-3xl font-bold text-center text-black mb-10">
            Actualizar Proveedor
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
            <label htmlFor="phone" className="block text-gray-700">
              telefono
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
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
}
