export const addFavoriteProduct = `
  mutation AddFavoriteProduct(
    $input: CreateFavoriteProductInput!
    $condition: ModelFavoriteProductConditionInput
  ) {
    createFavoriteProduct(input: $input, condition: $condition) {
      id
      userID
      productID
    }
  }
`

export const removeFavoriteProduct = `
  mutation RemoveFavoriteProduct(
    $input: DeleteFavoriteProductInput!
    $condition: ModelFavoriteProductConditionInput
  ) {
    deleteFavoriteProduct(input: $input, condition: $condition) {
      id
    }
  }
`