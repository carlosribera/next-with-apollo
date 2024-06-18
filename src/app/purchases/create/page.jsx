"use client";

import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { IconDelete, IconEdit } from "../../components/icons"; // Make sure this file exists
import DataTable from "react-data-table-component";
import { GET_PURCHASES, GET_DETAILPURCHASES } from './query'; // Ensure correct path

// GraphQL mutations and queries
const CREATE_PURCHASES = gql`
  mutation createPurchase($purchaseInput: PurchaseInput!) {
    createPurchase(purchaseInput: $purchaseInput) {
      idSupplier
      precioTotal
    }
  }
`;

const CREATE_DETAILPURCHASES = gql`
  mutation createDetailPurchase($detailPurchaseInput: DetailPurchaseInput!) {
    createDetailPurchase(detailPurchaseInput: $detailPurchaseInput) {
      idProducto
      cantidad
      precioProducto
    }
  }
`;

const GET_PRODUCTS = gql`
  query MyQuery {
    getAllProducts {
      id
      name
      price
    }
  }
`;

export default function CreatePurchase() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    idSupplier: "",
    productId: "",
    quantity: "",
    precioTotal: "",
  });

  const [purchases, setPurchases] = useState([]);

  const [createPurchase, { loading: loadingPurchase, error: errorPurchase }] = useMutation(CREATE_PURCHASES, {
    refetchQueries: [{ query: GET_PURCHASES }],
    onCompleted: () => {
      router.push("/purchases");
    },
  });

  const [createDetailPurchase, { loading: loadingDetailPurchase, error: errorDetailPurchase }] = useMutation(CREATE_DETAILPURCHASES, {
    refetchQueries: [{ query: GET_DETAILPURCHASES }],
  });

  const { data, loading: loadingProducts, error: errorProducts } = useQuery(GET_PRODUCTS);

  if (loadingProducts) {
    return (
      <p className="text-3xl font-bold text-center text-white h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }

  if (errorProducts) {
    return <p>Error: {errorProducts.message}</p>;
  }

  const products = data?.getAllProducts || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPurchase = () => {
    setPurchases([...purchases, formData]);
    setFormData({
      idSupplier: "",
      productId: "",
      quantity: "",
      precioTotal: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPurchase({
        variables: {
          purchaseInput: {
            idSupplier: formData.idSupplier,
            precioTotal: parseFloat(formData.precioTotal),
          },
        },
      });
      await createDetailPurchase({
        variables: {
          detailPurchaseInput: {
            idProducto: formData.productId,
            cantidad: parseInt(formData.quantity, 10),
            precioProducto: parseFloat(formData.precioTotal),
          },
        },
      });
    } catch (err) {
      console.error('Error creating purchase', err.message);
      alert(`Error creating purchase: ${err.message}`);
    }
  };

  const columns = [
    { name: "ID Proveedor", selector: (row) => row.idSupplier },
    { name: "Producto", selector: (row) => row.productId },
    { name: "Cantidad", selector: (row) => row.quantity },
    { name: "Precio Total", selector: (row) => row.precioTotal },
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
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Agregar Compra
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="idSupplier" className="block text-gray-700">
              ID de proveedor
            </label>
            <input
              type="text"
              id="idSupplier"
              name="idSupplier"
              value={formData.idSupplier}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productId" className="block text-gray-700">
              Producto
            </label>
            <select
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona un producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="precioTotal" className="block text-gray-700">
              PRECIO TOTAL
            </label>
            <input
              type="text"
              id="precioTotal"
              name="precioTotal"
              value={formData.precioTotal}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleAddPurchase}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4"
          >
            Agregar a la Tabla
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Registrar Compra
          </button>
          {loadingPurchase && <p>Loading...</p>}
          {errorPurchase && <p>Error: {errorPurchase.message}</p>}
          {loadingDetailPurchase && <p>Loading...</p>}
          {errorDetailPurchase && <p>Error: {errorDetailPurchase.message}</p>}
        </form>
        <div className="max-w-4xl mx-auto mt-10">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={purchases}
            pagination
            paginationPerPage={6}
            fixedHeader
            highlightOnHover
            noDataComponent="No hay compras registradas"
          />
        </div>
      </div>
    </>
  );
}
