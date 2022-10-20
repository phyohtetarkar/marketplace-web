export const fetchCategories = /* GraphQL */ `
  query FetchCategories {
    listCategories {
      items {
        id
        name
      }
      nextToken
      startedAt
    }
  }
`;