// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MemberRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN"
};

const UserRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN",
  "CONSUMER": "CONSUMER"
};

const { Product, Category, Shop, ShopMember, User, UserAddress, CartItem, FavoriteProduct, Banner, Discount } = initSchema(schema);

export {
  Product,
  Category,
  Shop,
  ShopMember,
  User,
  UserAddress,
  CartItem,
  FavoriteProduct,
  Banner,
  MemberRole,
  UserRole,
  Discount
};