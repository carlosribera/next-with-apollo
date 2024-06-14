import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      username
      token
      message
    }
  }
`;

export const useLoginUser = () => {
  return useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      window.location.href = "/dashboard";
    },
  });
};