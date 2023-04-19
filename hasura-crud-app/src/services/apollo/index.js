import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { authService } from '@/services/auth/AuthService';

const httpLink = new HttpLink({
  uri: 'https://hasura-food-recipes.herokuapp.com/v1alpha1/graphql'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = authService.getAccessToken();

  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  });

  return forward(operation);
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  }
};

// Create the apollo client
export default new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});
