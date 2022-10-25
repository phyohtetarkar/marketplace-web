// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN",
  "CONSUMER": "CONSUMER"
};

const MemberRole = {
  "OWNER": "OWNER",
  "ADMIN": "ADMIN"
};

const { Product, Category, Shop, ShopMember, User, Banner, Discount } = initSchema(schema);

export {
  Product,
  Category,
  Shop,
  ShopMember,
  User,
  Banner,
  UserRole,
  MemberRole,
  Discount
};