/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      images
      price
      discount {
        value
        type
      }
      description
      createdBy
      updatedBy
      available
      editors
      categoryID
      shopID
      category {
        id
        name
        image
        parent
        products {
          nextToken
        }
        createdAt
        updatedAt
      }
      shop {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        images
        price
        discount {
          value
          type
        }
        description
        createdBy
        updatedBy
        available
        editors
        categoryID
        shopID
        category {
          id
          name
          image
          parent
          createdAt
          updatedAt
        }
        shop {
          id
          name
          cover
          avatar
          description
          createdBy
          updatedBy
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShop = /* GraphQL */ `
  query GetShop($id: ID!) {
    getShop(id: $id) {
      id
      name
      cover
      avatar
      description
      createdBy
      updatedBy
      owner
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
          createdAt
          updatedAt
        }
        nextToken
      }
      members {
        items {
          id
          role
          shopID
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listShops = /* GraphQL */ `
  query ListShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phone
      avatar
      authID
      disabled
      role
      shops {
        items {
          id
          role
          shopID
          userID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        avatar
        authID
        disabled
        role
        shops {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      parent
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        parent
        products {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShopMember = /* GraphQL */ `
  query GetShopMember($id: ID!) {
    getShopMember(id: $id) {
      id
      role
      shopID
      userID
      shop {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        phone
        avatar
        authID
        disabled
        role
        shops {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listShopMembers = /* GraphQL */ `
  query ListShopMembers(
    $filter: ModelShopMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        role
        shopID
        userID
        shop {
          id
          name
          cover
          avatar
          description
          createdBy
          updatedBy
          owner
          createdAt
          updatedAt
        }
        user {
          id
          name
          phone
          avatar
          authID
          disabled
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
