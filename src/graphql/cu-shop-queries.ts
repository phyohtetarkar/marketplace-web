export const getShopById = `
  query GetShopById($id: ID!) {
    getShop(id: $id) {
      id
      name
      slug
      headline
      cover
      avatar
      description
      createdBy
      updatedBy
      suspended
      recommended
      createdAt
      updatedAt
    }
  }
`

export const findShopBySlug = `
  query FindShopBySlug($slug: String!) {
    getShopBySlug(slug: $slug) {
      id
      name
      slug
      headline
      cover
      avatar
      description
      createdBy
      updatedBy
      suspended
      recommended
      createdAt
      updatedAt
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
        headline
        cover
        avatar
        createdBy
        updatedBy
        suspended
        recommended
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`