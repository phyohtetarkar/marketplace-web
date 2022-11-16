/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBanner = /* GraphQL */ `
  query GetBanner($id: ID!) {
    getBanner(id: $id) {
      id
      image
      link
      position
      createdAt
      updatedAt
    }
  }
`;
export const listBanners = /* GraphQL */ `
  query ListBanners(
    $filter: ModelBannerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        link
        position
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
        slug
        image
        isMain
        categoryID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShopCategory = /* GraphQL */ `
  query GetShopCategory($id: ID!) {
    getShopCategory(id: $id) {
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
export const listShopCategories = /* GraphQL */ `
  query ListShopCategories(
    $filter: ModelShopCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDiscount = /* GraphQL */ `
  query GetDiscount($id: ID!) {
    getDiscount(id: $id) {
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
export const listDiscounts = /* GraphQL */ `
  query ListDiscounts(
    $filter: ModelDiscountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiscounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        value
        type
        productCount
        shopID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDiscountsByShop = /* GraphQL */ `
  query GetDiscountsByShop(
    $shopID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDiscountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDiscountsByShop(
      shopID: $shopID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        value
        type
        productCount
        shopID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
      nextToken
    }
  }
`;
export const getProductBySlug = /* GraphQL */ `
  query GetProductBySlug(
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
      nextToken
    }
  }
`;
export const getProductsOrderByPrice = /* GraphQL */ `
  query GetProductsOrderByPrice(
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
      nextToken
    }
  }
`;
export const getShop = /* GraphQL */ `
  query GetShop($id: ID!) {
    getShop(id: $id) {
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
      nextToken
    }
  }
`;
export const getShopBySlug = /* GraphQL */ `
  query GetShopBySlug(
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
      nextToken
    }
  }
`;
export const getShopsByCategory = /* GraphQL */ `
  query GetShopsByCategory(
    $categoryID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getShopsByCategory(
      categoryID: $categoryID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        image
        disabled
        role
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserAddress = /* GraphQL */ `
  query GetUserAddress($id: ID!) {
    getUserAddress(id: $id) {
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
export const listUserAddresses = /* GraphQL */ `
  query ListUserAddresses(
    $filter: ModelUserAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserAddresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getCartItem = /* GraphQL */ `
  query GetCartItem($id: ID!) {
    getCartItem(id: $id) {
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
export const listCartItems = /* GraphQL */ `
  query ListCartItems(
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getCartItemsByUser = /* GraphQL */ `
  query GetCartItemsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCartItemsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getFavoriteProduct = /* GraphQL */ `
  query GetFavoriteProduct($id: ID!) {
    getFavoriteProduct(id: $id) {
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
export const listFavoriteProducts = /* GraphQL */ `
  query ListFavoriteProducts(
    $filter: ModelFavoriteProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoriteProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getFavoriteProductsByUser = /* GraphQL */ `
  query GetFavoriteProductsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoriteProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getFavoriteProductsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
