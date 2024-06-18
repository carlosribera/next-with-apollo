import { gql, useMutation } from '@apollo/client';

import  { IconDelete, IconLoading }  from "../../components/icons";
import { GET_INVENTORIES } from "../page";

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteInventoryById($id: ID!) {
    deleteInventoryById(id: $id)
  }
`;

const DeleteButton = ({ id }) => {
  const [deleteInventoryById, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_INVENTORIES }],
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
      await deleteInventoryById();
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