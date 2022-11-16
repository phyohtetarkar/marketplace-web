export const getShopById = `
  query GetShopById($id: ID!) {
    getShop(id: $id) {
      id
      name
      slug
      cover
      logo
      description
      createdBy
      updatedBy
      recommended
      createdAt
      updatedAt
    }
  }
`

export const findShopBySlug = `
  query FindShopBySlug(
    $slug: String!
    $sortDirection: ModelSortDirection
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getShopBySlug(
      slug: $slug
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        cover
        logo
        description
        createdBy
        updatedBy
        recommended
        createdAt
        updatedAt
      }
    }
  }
`

export const findShops = `
  query FindShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        logo
        cover
        createdBy
        updatedBy
        recommended
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`