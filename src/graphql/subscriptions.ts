/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
      categoryID
      shopID
      category {
        id
        name
        image
        parent
        products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      shop {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
      categoryID
      shopID
      category {
        id
        name
        image
        parent
        products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      shop {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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
      categoryID
      shopID
      category {
        id
        name
        image
        parent
        products {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      shop {
        id
        name
        cover
        avatar
        description
        createdBy
        updatedBy
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop($filter: ModelSubscriptionShopFilterInput) {
    onCreateShop(filter: $filter) {
      id
      name
      cover
      avatar
      description
      createdBy
      updatedBy
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      members {
        items {
          id
          role
          shopID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop($filter: ModelSubscriptionShopFilterInput) {
    onUpdateShop(filter: $filter) {
      id
      name
      cover
      avatar
      description
      createdBy
      updatedBy
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      members {
        items {
          id
          role
          shopID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop($filter: ModelSubscriptionShopFilterInput) {
    onDeleteShop(filter: $filter) {
      id
      name
      cover
      avatar
      description
      createdBy
      updatedBy
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      members {
        items {
          id
          role
          shopID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
          categoryID
          shopID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateShopMember = /* GraphQL */ `
  subscription OnCreateShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
    $owner: String
  ) {
    onCreateShopMember(filter: $filter, owner: $owner) {
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
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateShopMember = /* GraphQL */ `
  subscription OnUpdateShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
    $owner: String
  ) {
    onUpdateShopMember(filter: $filter, owner: $owner) {
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
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteShopMember = /* GraphQL */ `
  subscription OnDeleteShopMember(
    $filter: ModelSubscriptionShopMemberFilterInput
    $owner: String
  ) {
    onDeleteShopMember(filter: $filter, owner: $owner) {
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
        products {
          nextToken
          startedAt
        }
        members {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateBanner = /* GraphQL */ `
  subscription OnCreateBanner($filter: ModelSubscriptionBannerFilterInput) {
    onCreateBanner(filter: $filter) {
      id
      image
      link
      position
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
