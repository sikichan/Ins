import { INewPost, INewUser, IUser } from '@/types';
import { account, appWriteConfig, avatar, databases, storage } from '@/lib/appwrite/config.ts';
import { ID, ImageGravity, Query } from 'appwrite';

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
  const newAccount = await account.create(id, user.email, user.password, user.name);
  if (!newAccount) throw new Error('Please try again later');
  const newUser = await saveUserToDB({
    imageUrl: imageUrl.toString(),
    name: user.name,
    username: user.username,
    email: user.email,
    accountId: newAccount.$id,
  });
  if (!newUser) throw new Error('Please try again later');

  return newUser;
}

export async function signInAccount({ email, password }: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.usersCollectionId, [Query.equal('accountId', currentAccount.$id)]);
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const session = await account.deleteSession('current');
    // localStorage.removeItem('ins-session');

    return session;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function saveUserToDB(user: Omit<IUser, 'id'> & { accountId: string }) {
  return databases.createDocument(appWriteConfig.databaseId, appWriteConfig.usersCollectionId, ID.unique(), user);
}

export async function createPost(post: INewPost) {
  try {
    const uploadedFiles = await uploadFile(post.file);
    if (!uploadedFiles || !uploadedFiles.length) throw Error;
    const imageUrls = uploadedFiles.map((file) => getFilePreview(file.$id));
    if (!imageUrls || !imageUrls.length) {
      for (let file of uploadedFiles) {
        await deleteFile(file.$id);
      }
      throw Error;
    }
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    const newPost = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, ID.unique(), {
      creator: post.userId,
      caption: post.caption,
      imageUrl: imageUrls,
      imageId: uploadedFiles.map((file) => file.$id),
      location: post.location,
      tags,
    });
    if (!newPost) {
      console.log(uploadedFiles);
      for (let file of uploadedFiles) {
        await deleteFile(file.$id);
      }
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}
export async function uploadFile(files: File[]) {
  try {
    const promises = [];
    for (const file of files) {
      promises.push(storage.createFile(appWriteConfig.storageId, ID.unique(), file));
    }
    // const uploadedFile = await storage.createFile(appWriteConfig.storageId, ID.unique(), file);
    const uploadedFiles = await Promise.all(promises);
    return uploadedFiles;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appWriteConfig.storageId, fileId);

    return true;
  } catch (error) {
    console.log(error);
  }
}
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 1000, 1000, ImageGravity.Top, 100);

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}
