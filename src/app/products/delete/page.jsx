import { gql, useMutation } from '@apollo/client';

import  { IconDelete, IconLoading }  from "../../components/icons";
import { GET_PRODUCTS } from "../page";

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteProductById($id: ID!) {
    deleteProductById(id: $id)
  }
`;

const DeleteButton = ({ id }) => {
  const [deleteProductById, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    variables: { id },
    update(cache) {
      cache.modify({
        fields: {
          items(existingItems = [], { readField }) {
            return existingItems.filter(
              itemRef => id !== readField('id', itemRef)
            );
          },
        },
      });
    },
    onError(err) {
      console.error("Error deleting item:", err);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteProductById();
      console.log('Item deleted successfully');
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? IconLoading : IconDelete}
    </button>
  );
};

export default DeleteButton;