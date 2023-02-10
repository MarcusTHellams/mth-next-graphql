import { Prisma,PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export function UsersNoPasswords(prismaUser: PrismaClient['user']) {
  return Object.assign(prismaUser, {
    /**
     * Signup the first user and create a new team of one. Return the User with
     * a full name and without a password
     */
    async findMany(opts: Prisma.UserFindManyArgs) {
      const users = await prisma.user.findMany(opts);
      return users.map((user) => {
        return exclude(user, ['password']);
      });
    },
  });
}

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  // eslint-disable-next-line prefer-const
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
