// queries.js
import { gql } from '@apollo/client';

export const GET_PURCHASES = gql`
  query GetPurchases {
    getAllPurchases {
      id
      idSupplier
      precioTotal
    }
  }
`;

export const GET_DETAILPURCHASES = gql`
  query GetDetailPurchases {
    getAllDetailPurchases {
      id
      idProducto
      cantidad
      precioProducto
    }
  }
`;
