import { gql, useMutation } from '@apollo/client';

import  { IconDelete, IconLoading }  from "../../components/icons";
import { GET_SUPPLIERS } from "../page";

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteSupplierById($id: ID!) {
    deleteSupplierById(id: $id)
  }
`;

const DeleteButton = ({ id }) => {
  const [deleteSupplierById, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: GET_SUPPLIERS }],
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
      await deleteSupplierById();
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