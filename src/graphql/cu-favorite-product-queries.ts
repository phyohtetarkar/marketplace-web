export const findFavoriteProductsByUser = `
  query FindFavoriteProductsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    favoriteProductsByUser(
        userID: $userID
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
    ) {
      items {
        id
        userID
        product {
            id
            name
            slug
            price
            images
            description
            discount {
              type
              value
            }
            category {
              id
              name
              slug
            }
            shop {
              id
              name
              avatar
              slug
            }
        }
      }
      nextToken
    }
  }
`