export const findProductById = `
  query FindProductById($id: ID!) {
    getProduct(id: $id) {
      id
      name
      slug
      price
      images
      description
      category {
        id
        name
        slug
      }
      shop {
        id
        name
        logo
        slug
      }
    }
  }
`

export const findProductBySlug = `
  query FindProductBySlug(
    $slug: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getProductBySlug(
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
        price
        images
        description
        category {
          id
          name
          slug
        }
        shop {
          id
          name
          logo
          slug
        }
      }
    }
  }
`

export const findProducts = `
  query FindProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        price
        images
        category {
          id
          name
          slug
        }
        shop {
          id
          name
          logo
          slug
        }
      }
      nextToken
    }
  }
`

export const findProductsOrderByPrice = `
  query FindProductsOrderByPrice(
    $type: String!
    $price: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getProductsOrderByPrice(
      type: $type
      price: $price
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        price
        images
        category {
          id
          name
          slug
        }
        shop {
          id
          name
          logo
          slug
        }
      }
      nextToken
    }
  }
`