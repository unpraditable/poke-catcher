import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default class Pokemon {
  static GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          url
          name
          image
        }
      }
    }
  `;

  static gqlVariables = {
    limit: 100,
    offset: 0,
  };
}
