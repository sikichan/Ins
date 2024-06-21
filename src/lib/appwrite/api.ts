import { INewPost, INewUser, IUser } from '@/types';
import { account, appWriteConfig, avatar, databases, storage } from '@/lib/appwrite/config.ts';
import { ID, ImageGravity, Query } from 'appwrite';

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
    const currentUser = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.usersCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ]);
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}
export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc('$createdAt')];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.usersCollectionId, queries);

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
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

export async function getRecentPosts() {
  try {
    const posts = databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(20),
    ]);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, [Query.search('caption', searchTerm)]);

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, queries);

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, postId);

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(appWriteConfig.databaseId, appWriteConfig.usersCollectionId, userId);

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}
// export async function updatePost(post: IUpdatePost) {
//   const hasFileToUpdate = post.file.length > 0;
//
//   try {
//     let image = {
//       imageUrl: post.imageUrl,
//       imageId: post.imageId,
//     };
//
//     if (hasFileToUpdate) {
//       const uploadedFile = await uploadFile(post.file);
//       if (!uploadedFile) throw Error;
//
//       const fileUrl = getFilePreview(uploadedFile.$id);
//       if (!fileUrl) {
//         await deleteFile(uploadedFile.$id);
//         throw Error;
//       }
//
//       image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
//     }
//
//     const tags = post.tags?.replace(/ /g, '').split(',') || [];
//
//     const updatedPost = await databases.updateDocument(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, post.postId, {
//       caption: post.caption,
//       imageUrl: image.imageUrl,
//       imageId: image.imageId,
//       location: post.location,
//       tags: tags,
//     });
//
//     if (!updatedPost) {
//       if (hasFileToUpdate) {
//         await deleteFile(image.imageId);
//       }
//
//       throw Error;
//     }
//
//     if (hasFileToUpdate) {
//       await deleteFile(post.imageId);
//     }
//
//     return updatedPost;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, postId);

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: 'Ok' };
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, postId, {
      likes: likesArray,
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.savesCollectionId, ID.unique(), {
      user: userId,
      post: postId,
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(appWriteConfig.databaseId, appWriteConfig.savesCollectionId, savedRecordId);

    if (!statusCode) throw Error;

    return { status: 'Ok' };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.postsCollectionId, [
      Query.equal('creator', userId),
      Query.orderDesc('$createdAt'),
    ]);

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}
