import { gql } from 'graphql-request';

export const USER_FRAGMENT = gql`
  fragment UserParts on UserType {
    id
    firstName
    lastName
    username
    email
  }
`;

export const TASK_FRAGMENT = gql`
  fragment TaskParts on TaskType {
    id
    title
    description
    ownerId
  }
`;
export const ROLE_FRAGMENT = gql`
  fragment RoleParts on RoleType {
    id
    name
    description
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      ...UserParts
      tasks {
        ...TaskParts
      }
      roles {
        ...RoleParts
      }
    }
  }
  ${USER_FRAGMENT}
  ${TASK_FRAGMENT}
  ${ROLE_FRAGMENT}
`;
