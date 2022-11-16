/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBanner = /* GraphQL */ `
  subscription OnCreateBanner($filter: ModelSubscriptionBannerFilterInput) {
    onCreateBanner(filter: $filter) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBanner = /* GraphQL */ `
  subscription OnUpdateBanner($filter: ModelSubscriptionBannerFilterInput) {
    onUpdateBanner(filter: $filter) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBanner = /* GraphQL */ `
  subscription OnDeleteBanner($filter: ModelSubscriptionBannerFilterInput) {
    onDeleteBanner(filter: $filter) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
      id
      name
      slug
      image
      isMain
      categoryID
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      categories {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
      id
      name
      slug
      image
      isMain
      categoryID
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      categories {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
      id
      name
      slug
      image
      isMain
      categoryID
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      categories {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateShopCategory = /* GraphQL */ `
  subscription OnCreateShopCategory(
    $filter: ModelSubscriptionShopCategoryFilterInput
  ) {
    onCreateShopCategory(filter: $filter) {
      id
      name
      shops {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShopCategory = /* GraphQL */ `
  subscription OnUpdateShopCategory(
    $filter: ModelSubscriptionShopCategoryFilterInput
  ) {
    onUpdateShopCategory(filter: $filter) {
      id
      name
      shops {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShopCategory = /* GraphQL */ `
  subscription OnDeleteShopCategory(
    $filter: ModelSubscriptionShopCategoryFilterInput
  ) {
    onDeleteShopCategory(filter: $filter) {
      id
      name
      shops {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDiscount = /* GraphQL */ `
  subscription OnCreateDiscount($filter: ModelSubscriptionDiscountFilterInput) {
    onCreateDiscount(filter: $filter) {
      id
      title
      value
      type
      productCount
      shopID
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDiscount = /* GraphQL */ `
  subscription OnUpdateDiscount($filter: ModelSubscriptionDiscountFilterInput) {
    onUpdateDiscount(filter: $filter) {
      id
      title
      value
      type
      productCount
      shopID
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDiscount = /* GraphQL */ `
  subscription OnDeleteDiscount($filter: ModelSubscriptionDiscountFilterInput) {
    onDeleteDiscount(filter: $filter) {
      id
      title
      value
      type
      productCount
      shopID
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      name
      slug
      thumbnail
      images
      price
      sku
      description
      hasVariant
      newArrival
      outOfStock
      deleted
      featured
      status
      createdBy
      updatedBy
      options {
        key
        name
      }
      variants {
        key
        title
        price
        sku
      }
      discountID
      categoryID
      shopID
      discount {
        id
        title
        value
        type
        productCount
        shopID
        createdAt
        updatedAt
      }
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
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
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      name
      slug
      thumbnail
      images
      price
      sku
      description
      hasVariant
      newArrival
      outOfStock
      deleted
      featured
      status
      createdBy
      updatedBy
      options {
        key
        name
      }
      variants {
        key
        title
        price
        sku
      }
      discountID
      categoryID
      shopID
      discount {
        id
        title
        value
        type
        productCount
        shopID
        createdAt
        updatedAt
      }
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
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
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      name
      slug
      thumbnail
      images
      price
      sku
      description
      hasVariant
      newArrival
      outOfStock
      deleted
      featured
      status
      createdBy
      updatedBy
      options {
        key
        name
      }
      variants {
        key
        title
        price
        sku
      }
      discountID
      categoryID
      shopID
      discount {
        id
        title
        value
        type
        productCount
        shopID
        createdAt
        updatedAt
      }
      category {
        id
        name
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
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
  }
`;
export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop($filter: ModelSubscriptionShopFilterInput) {
    onCreateShop(filter: $filter) {
      id
      name
      slug
      logo
      cover
      description
      location {
        lat
        long
      }
      recommended
      status
      createdBy
      updatedBy
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      members {
        nextToken
      }
      discounts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop($filter: ModelSubscriptionShopFilterInput) {
    onUpdateShop(filter: $filter) {
      id
      name
      slug
      logo
      cover
      description
      location {
        lat
        long
      }
      recommended
      status
      createdBy
      updatedBy
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      members {
        nextToken
      }
      discounts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop($filter: ModelSubscriptionShopFilterInput) {
    onDeleteShop(filter: $filter) {
      id
      name
      slug
      logo
      cover
      description
      location {
        lat
        long
      }
      recommended
      status
      createdBy
      updatedBy
      categoryID
      category {
        id
        name
        createdAt
        updatedAt
      }
      products {
        nextToken
      }
      members {
        nextToken
      }
      discounts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      phone
      email
      image
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
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      phone
      email
      image
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
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      phone
      email
      image
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
  }
`;
export const onCreateShopMember = /* GraphQL */ `
  subscription OnCreateShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
  ) {
    onCreateShopMember(filter: $filter) {
      id
      role
      shopID
      userID
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
        createdAt
        updatedAt
      }
      user {
        id
        name
        phone
        email
        image
        disabled
        role
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShopMember = /* GraphQL */ `
  subscription OnUpdateShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
  ) {
    onUpdateShopMember(filter: $filter) {
      id
      role
      shopID
      userID
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
        createdAt
        updatedAt
      }
      user {
        id
        name
        phone
        email
        image
        disabled
        role
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShopMember = /* GraphQL */ `
  subscription OnDeleteShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
  ) {
    onDeleteShopMember(filter: $filter) {
      id
      role
      shopID
      userID
      shop {
        id
        name
        slug
        logo
        cover
        description
        recommended
        status
        createdBy
        updatedBy
        categoryID
        createdAt
        updatedAt
      }
      user {
        id
        name
        phone
        email
        image
        disabled
        role
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserAddress = /* GraphQL */ `
  subscription OnCreateUserAddress(
    $filter: ModelSubscriptionUserAddressFilterInput
  ) {
    onCreateUserAddress(filter: $filter) {
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
export const onUpdateUserAddress = /* GraphQL */ `
  subscription OnUpdateUserAddress(
    $filter: ModelSubscriptionUserAddressFilterInput
  ) {
    onUpdateUserAddress(filter: $filter) {
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
export const onDeleteUserAddress = /* GraphQL */ `
  subscription OnDeleteUserAddress(
    $filter: ModelSubscriptionUserAddressFilterInput
  ) {
    onDeleteUserAddress(filter: $filter) {
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
export const onCreateCartItem = /* GraphQL */ `
  subscription OnCreateCartItem(
    $filter: ModelSubscriptionCartItemFilterInput
    $owner: String
  ) {
    onCreateCartItem(filter: $filter, owner: $owner) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
export const onUpdateCartItem = /* GraphQL */ `
  subscription OnUpdateCartItem(
    $filter: ModelSubscriptionCartItemFilterInput
    $owner: String
  ) {
    onUpdateCartItem(filter: $filter, owner: $owner) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
export const onDeleteCartItem = /* GraphQL */ `
  subscription OnDeleteCartItem(
    $filter: ModelSubscriptionCartItemFilterInput
    $owner: String
  ) {
    onDeleteCartItem(filter: $filter, owner: $owner) {
      id
      quantity
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
export const onCreateFavoriteProduct = /* GraphQL */ `
  subscription OnCreateFavoriteProduct(
    $filter: ModelSubscriptionFavoriteProductFilterInput
    $owner: String
  ) {
    onCreateFavoriteProduct(filter: $filter, owner: $owner) {
      id
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
export const onUpdateFavoriteProduct = /* GraphQL */ `
  subscription OnUpdateFavoriteProduct(
    $filter: ModelSubscriptionFavoriteProductFilterInput
    $owner: String
  ) {
    onUpdateFavoriteProduct(filter: $filter, owner: $owner) {
      id
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
export const onDeleteFavoriteProduct = /* GraphQL */ `
  subscription OnDeleteFavoriteProduct(
    $filter: ModelSubscriptionFavoriteProductFilterInput
    $owner: String
  ) {
    onDeleteFavoriteProduct(filter: $filter, owner: $owner) {
      id
      userID
      productID
      product {
        id
        name
        slug
        thumbnail
        images
        price
        sku
        description
        hasVariant
        newArrival
        outOfStock
        deleted
        featured
        status
        createdBy
        updatedBy
        discountID
        categoryID
        shopID
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
