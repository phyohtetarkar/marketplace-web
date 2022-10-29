export const addProductToCart = `
  mutation AddProductToCart(
    $input: CreateCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    createCartItem(input: $input, condition: $condition) {
      id
      quantity
      userID
      productID
    }
  }
`

export const removeProductFromCart = /* GraphQL */ `
  mutation RemoveProductFromCart(
    $input: DeleteCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    deleteCartItem(input: $input, condition: $condition) {
      id
    }
  }
`;