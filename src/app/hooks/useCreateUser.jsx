import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      username
      token
      message
    }
  }
`;

export const useCreateUser = () => {
  return useMutation(CREATE_USER);
};
