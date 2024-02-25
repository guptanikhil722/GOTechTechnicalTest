import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    concat,
    ApolloLink,
    from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import MenuScreen from "../screens/MenuScreen";
  
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
       "x-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInR5cGUiOiJNZXJjaGFudCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcwODY3OTcxNH0.gNb-NA1NSUNT9KrEeTnTuJXoBxus3Yxtv_qqPPe8Km0"
      }
    }));
  
    return forward(operation);
  })
  const link = from([
    authMiddleware,
    errorLink,
    new HttpLink({ uri: "https://bazaaromall.com:8082/graphql" }),
  ]);
  
 

  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware,link)
  });

  function AppoloProvider() {
    return (
      <ApolloProvider client={client}>
        {" "}
        <MenuScreen />
      </ApolloProvider>
    );
  }
  
  export default AppoloProvider;