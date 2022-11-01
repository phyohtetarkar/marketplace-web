export const getUserById = /* GraphQL */ `
  query GetUserById($id: ID!) {
    getUser(id: $id) {
      id
      name
      phone
      email
      avatar
      disabled
      role
      createdAt
      updatedAt
    }
  }
`;