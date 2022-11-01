/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
        categoryID
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
          categoryID
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
          categoryID
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
      nextToken
    }
  }
`;
export const productsByPrice = /* GraphQL */ `
  query ProductsByPrice(
    $type: String!
    $price: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByPrice(
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
          categoryID
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
      avatar
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
      categoryID
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
        categoryID
        products {
          nextToken
        }
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
        email
        avatar
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
        user {
          id
          name
          phone
          email
          avatar
          disabled
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
          categoryID
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
        product {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const cartItemsByUser = /* GraphQL */ `
  query CartItemsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCartItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    cartItemsByUser(
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
        product {
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
          categoryID
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
        product {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const favoriteProductsByUser = /* GraphQL */ `
  query FavoriteProductsByUser(
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
        productID
        product {
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
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
