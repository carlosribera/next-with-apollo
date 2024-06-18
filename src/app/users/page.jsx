"use client";

import { gql, useQuery } from "@apollo/client";
// import { IconDelete, IconEdit } from "../components/icons";

import DataTable from "react-data-table-component";
const query = gql`
  query {
    getAllUsers {
      id
      username
      isEnabled
      role {
        roleName
      }
    }
  }
`;

function UserPage() {
  const { data, loading, error } = useQuery(query);

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

  const usuarios = data?.getAllUsers || [];
  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.username,
    },
    {
      name: "ROL",
      selector: (row) => row.role?.roleName,
    },
    {
      name: "ESTADO",
      selector: (row) => (row.isEnabled ? "Activo" : "Inactivo"),
    },
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
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      {usuarios.length > 0 ? (
        <div className="rounded-t-2xl">
          <h2 className="text-3xl font-bold text-center text-black mb-5">
            LISTA DE USUARIOS
          </h2>
          <DataTable
            // title="Lista de Usuarios"
            customStyles={customStyles}
            columns={columns}
            data={usuarios}
            pagination
            paginationPerPage={6}
            fixedHeader
            highlightOnHover
            noDataComponent="No existen usuarios"
          />
        </div>
      ) : (
        <p>No users</p>
      )}
    </div>
  );
}
export default UserPage;
