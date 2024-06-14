import { INewUser, IUser } from '@/types';
import {
  account,
  appWriteConfig,
  avatar,
  databases,
} from '@/lib/appwrite/config.ts';
import { ID, Query } from 'appwrite';

// export class ApiError extends Error {
//   type: string;
//   message: string;
//   code: number;
//
//   constructor({
//     type = '',
//     message = 'An error occurred',
//     code = 500,
//   }: {
//     type: string;
//     message?: string;
//     code?: number;
//   }) {
//     super(message);
//     this.type = type;
//     this.message = message;
//     this.code = code;
//
//     // Set the prototype explicitly.
//     Object.setPrototypeOf(this, ApiError.prototype);
//   }
// }

export async function createAccount(user: INewUser) {
  const id = ID.unique();
  const imageUrl = avatar.getInitials(user.name);
  const newAccount = await account.create(
    id,
    user.email,
    user.password,
    user.name
  );
  if (!newAccount)
    throw new Error('Please try again later');
  const newUser = await saveUserToDB({
    imageUrl,
    name: user.name,
    username: user.username,
    email: user.email,
    accountId: newAccount.$id,
  });
  if (!newUser) throw new Error('Please try again later');

  return newUser;
}

export async function signInAccount({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session =
      await account.createEmailPasswordSession(
        email,
        password
      );
    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const sessionId = localStorage.getItem('ins-session');
    console.log('session logout: ', sessionId);
    if (!sessionId) {
      return true;
    }
    await account.deleteSession(sessionId);
    localStorage.removeItem('ins-session');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function saveUserToDB(
  user: Omit<IUser, 'id'> & { accountId: string }
) {
  return databases.createDocument(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    ID.unique(),
    user
  );
}
