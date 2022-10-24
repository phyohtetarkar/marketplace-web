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
      editors
      categoryID
      shopID
      category {
        id
        name
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
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
      editors
      categoryID
      shopID
      category {
        id
        name
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
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
      editors
      categoryID
      shopID
      category {
        id
        name
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
        products {
          nextToken
        }
        members {
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
export const createShop = /* GraphQL */ `
  mutation CreateShop(
    $input: CreateShopInput!
    $condition: ModelShopConditionInput
  ) {
    createShop(input: $input, condition: $condition) {
      id
      name
      cover
      avatar
      description
      createdBy
      updatedBy
      owner
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
          owner
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
      cover
      avatar
      description
      createdBy
      updatedBy
      owner
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
          owner
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
      cover
      avatar
      description
      createdBy
      updatedBy
      owner
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
          owner
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
          owner
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
          owner
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
          owner
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
      image
      parent
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
      image
      parent
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
      image
      parent
      products {
        items {
          id
          name
          images
          price
          description
          createdBy
          updatedBy
          available
          editors
          categoryID
          shopID
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
        cover
        avatar
        description
        createdBy
        updatedBy
        owner
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
