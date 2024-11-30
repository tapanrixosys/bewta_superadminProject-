import "./App.css";
import RoutePage from "./Routes/Route";
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
// import RoutePage from "./Pages/Routes/Route";

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql', //  GraphQL endpoint
    cache: new InMemoryCache(),
  });

  return (
    <div className="App">
        <ApolloProvider client={client}>
        <RoutePage/>
        </ApolloProvider>
      
    </div>
  );
}

export default App;
