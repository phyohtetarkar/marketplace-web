export const getUserById = /* GraphQL */ `
  query GetUserById($id: ID!) {
    getUser(id: $id) {
      id
      name
      phone
      email
      image
      disabled
      role
      createdAt
      updatedAt
    }
  }
`;