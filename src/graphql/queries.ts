/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      image
      price
      description
      createdBy
      updatedBy
      available
      shopID
      category {
        id
        name
        image
        type
        parent
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productCategoryId
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
        image
        price
        description
        createdBy
        updatedBy
        available
        shopID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        productCategoryId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        price
        description
        createdBy
        updatedBy
        available
        shopID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        productCategoryId
      }
      nextToken
      startedAt
    }
  }
`;
export const getShop = /* GraphQL */ `
  query GetShop($id: ID!) {
    getShop(id: $id) {
      id
      name
      cover
      profile
      users {
        nextToken
        startedAt
      }
      products {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        profile
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncShops = /* GraphQL */ `
  query SyncShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShops(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        cover
        profile
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      phone
      email
      avatar
      identity
      disabled
      shops {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        email
        avatar
        identity
        disabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        phone
        email
        avatar
        identity
        disabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      image
      type
      parent
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        type
        parent
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        image
        type
        parent
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const categoriesByName = /* GraphQL */ `
  query CategoriesByName(
    $type: String!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoriesByName(
      type: $type
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        image
        type
        parent
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const categoriesByDate = /* GraphQL */ `
  query CategoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    categoriesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        image
        type
        parent
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getShopUser = /* GraphQL */ `
  query GetShopUser($id: ID!) {
    getShopUser(id: $id) {
      id
      shopID
      userID
      shop {
        id
        name
        cover
        profile
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        phone
        email
        avatar
        identity
        disabled
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listShopUsers = /* GraphQL */ `
  query ListShopUsers(
    $filter: ModelShopUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shopID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncShopUsers = /* GraphQL */ `
  query SyncShopUsers(
    $filter: ModelShopUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShopUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        shopID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
