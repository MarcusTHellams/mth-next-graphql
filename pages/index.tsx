import { User } from '@prisma/client';
import { type GetServerSidePropsResult } from 'next';
import Head from 'next/head';

import { exclude, prisma } from '@/utils';

export default function Home({ users }: { users: User[] }) {
  return (
    <>
      <Head>
        <title>MTH</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </main>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{ users: Omit<User, 'password'>[] }>
  // eslint-disable-next-line indent
> {
  const usersWithPasswords = await prisma.user.findMany({
    include: {
      roles: true,
      tasks: true,
    },
  });
  const users = usersWithPasswords.map((user) => {
    return exclude(user, ['password']);
  });

  return {
    props: {
      users,
    },
  };
}
