"use client"
import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient, 
    InMemoryCache
} from "@apollo/experimental-nextjs-app-support"

function makeClient() {
    const httpLink = new HttpLink({
        uri: "http://localhost:9090/graphql",
        credentials: "same-origin"
    })

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        cache: new InMemoryCache(),
        link: httpLink
    })
}
export function ApolloWrapper({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}