"use client"
import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/experimental-nextjs-app-support"
import { setContext } from "@apollo/client/link/context";

function makeClient() {
    const httpLink = new HttpLink({
        uri: "http://localhost:9090/graphql",
        // uri: "http://localhost:8080/graphql",
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        return {
            headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
 
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        cache: new InMemoryCache(),
        // link: httpLink,
        link: authLink.concat(httpLink),
    })
}
export function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}