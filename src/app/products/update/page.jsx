"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_PRODUCTS } from "../page";

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $productInput: ProductInput!) {
    updateProduct(id: $id, productInput: $productInput) {
      name
      price
      imageUrl
      description
    }
  }
`;
export default function UpdateClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const [updateClient] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],

    onCompleted: () => {
      router.push("/products");
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
      await updateClient({
        variables: {
          id,
          productInput: {
            name: formData.name,
            price: parseFloat(formData.price),
            imageUrl: formData.imageUrl,
            description: formData.description,
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
          Actualizar Cliente
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
            <label htmlFor="price" className="block text-gray-700">
              Precio
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700">
              url
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Descripcion
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
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
