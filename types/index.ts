import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../utils';

export type IContext = {
  prisma: typeof prisma;
} & { req: NextApiRequest; res: NextApiResponse };

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  tasks: Task[];
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  description: string;
  title: string;
}
