/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      slug
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
      suspended
      newArrival
      deleted
      mainCategoryID
      subCategoryID
      categoryID
      shopID
      category {
        id
        name
        slug
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
        slug
        headline
        cover
        avatar
        description
        createdBy
        updatedBy
        suspended
        recommended
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      favoriteUsers {
        items {
          id
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      slug
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
      suspended
      newArrival
      deleted
      mainCategoryID
      subCategoryID
      categoryID
      shopID
      category {
        id
        name
        slug
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
        slug
        headline
        cover
        avatar
        description
        createdBy
        updatedBy
        suspended
        recommended
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      favoriteUsers {
        items {
          id
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      slug
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
      suspended
      newArrival
      deleted
      mainCategoryID
      subCategoryID
      categoryID
      shopID
      category {
        id
        name
        slug
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
        slug
        headline
        cover
        avatar
        description
        createdBy
        updatedBy
        suspended
        recommended
        products {
          nextToken
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      favoriteUsers {
        items {
          id
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const createShop = /* GraphQL */ `
  mutation CreateShop(
    $input: CreateShopInput!
    $condition: ModelShopConditionInput
  ) {
    createShop(input: $input, condition: $condition) {
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
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateShop = /* GraphQL */ `
  mutation UpdateShop(
    $input: UpdateShopInput!
    $condition: ModelShopConditionInput
  ) {
    updateShop(input: $input, condition: $condition) {
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
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteShop = /* GraphQL */ `
  mutation DeleteShop(
    $input: DeleteShopInput!
    $condition: ModelShopConditionInput
  ) {
    deleteShop(input: $input, condition: $condition) {
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
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      addresses {
        items {
          id
          city
          township
          address
          primary
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      favoriteProducts {
        items {
          id
          userID
          productID
          owner
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      addresses {
        items {
          id
          city
          township
          address
          primary
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      favoriteProducts {
        items {
          id
          userID
          productID
          owner
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      addresses {
        items {
          id
          city
          township
          address
          primary
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      cartItems {
        items {
          id
          quantity
          userID
          productID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      favoriteProducts {
        items {
          id
          userID
          productID
          owner
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      slug
      image
      parent
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      slug
      image
      parent
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      slug
      image
      parent
      products {
        items {
          id
          name
          slug
          images
          price
          description
          createdBy
          updatedBy
          available
          suspended
          newArrival
          deleted
          mainCategoryID
          subCategoryID
          categoryID
          shopID
          type
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
export const createShopMember = /* GraphQL */ `
  mutation CreateShopMember(
    $input: CreateShopMemberInput!
    $condition: ModelShopMemberConditionInput
  ) {
    createShopMember(input: $input, condition: $condition) {
      id
      role
      shopID
      userID
      shop {
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
        addresses {
          nextToken
        }
        cartItems {
          nextToken
        }
        favoriteProducts {
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
export const updateShopMember = /* GraphQL */ `
  mutation UpdateShopMember(
    $input: UpdateShopMemberInput!
    $condition: ModelShopMemberConditionInput
  ) {
    updateShopMember(input: $input, condition: $condition) {
      id
      role
      shopID
      userID
      shop {
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
        addresses {
          nextToken
        }
        cartItems {
          nextToken
        }
        favoriteProducts {
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
export const deleteShopMember = /* GraphQL */ `
  mutation DeleteShopMember(
    $input: DeleteShopMemberInput!
    $condition: ModelShopMemberConditionInput
  ) {
    deleteShopMember(input: $input, condition: $condition) {
      id
      role
      shopID
      userID
      shop {
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
        addresses {
          nextToken
        }
        cartItems {
          nextToken
        }
        favoriteProducts {
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
export const createBanner = /* GraphQL */ `
  mutation CreateBanner(
    $input: CreateBannerInput!
    $condition: ModelBannerConditionInput
  ) {
    createBanner(input: $input, condition: $condition) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const updateBanner = /* GraphQL */ `
  mutation UpdateBanner(
    $input: UpdateBannerInput!
    $condition: ModelBannerConditionInput
  ) {
    updateBanner(input: $input, condition: $condition) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const deleteBanner = /* GraphQL */ `
  mutation DeleteBanner(
    $input: DeleteBannerInput!
    $condition: ModelBannerConditionInput
  ) {
    deleteBanner(input: $input, condition: $condition) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const createUserAddress = /* GraphQL */ `
  mutation CreateUserAddress(
    $input: CreateUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    createUserAddress(input: $input, condition: $condition) {
      id
      city
      township
      address
      primary
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateUserAddress = /* GraphQL */ `
  mutation UpdateUserAddress(
    $input: UpdateUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    updateUserAddress(input: $input, condition: $condition) {
      id
      city
      township
      address
      primary
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserAddress = /* GraphQL */ `
  mutation DeleteUserAddress(
    $input: DeleteUserAddressInput!
    $condition: ModelUserAddressConditionInput
  ) {
    deleteUserAddress(input: $input, condition: $condition) {
      id
      city
      township
      address
      primary
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createCartItem = /* GraphQL */ `
  mutation CreateCartItem(
    $input: CreateCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    createCartItem(input: $input, condition: $condition) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateCartItem = /* GraphQL */ `
  mutation UpdateCartItem(
    $input: UpdateCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    updateCartItem(input: $input, condition: $condition) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteCartItem = /* GraphQL */ `
  mutation DeleteCartItem(
    $input: DeleteCartItemInput!
    $condition: ModelCartItemConditionInput
  ) {
    deleteCartItem(input: $input, condition: $condition) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createFavoriteProduct = /* GraphQL */ `
  mutation CreateFavoriteProduct(
    $input: CreateFavoriteProductInput!
    $condition: ModelFavoriteProductConditionInput
  ) {
    createFavoriteProduct(input: $input, condition: $condition) {
      id
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateFavoriteProduct = /* GraphQL */ `
  mutation UpdateFavoriteProduct(
    $input: UpdateFavoriteProductInput!
    $condition: ModelFavoriteProductConditionInput
  ) {
    updateFavoriteProduct(input: $input, condition: $condition) {
      id
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavoriteProduct = /* GraphQL */ `
  mutation DeleteFavoriteProduct(
    $input: DeleteFavoriteProductInput!
    $condition: ModelFavoriteProductConditionInput
  ) {
    deleteFavoriteProduct(input: $input, condition: $condition) {
      id
      userID
      productID
      product {
        id
        name
        slug
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
        suspended
        newArrival
        deleted
        mainCategoryID
        subCategoryID
        categoryID
        shopID
        category {
          id
          name
          slug
          image
          parent
          createdAt
          updatedAt
        }
        shop {
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
        favoriteUsers {
          nextToken
        }
        cartItems {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
