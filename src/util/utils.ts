import * as jwt from "jsonwebtoken";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig, getSongs, getUsers, postSongs, postUser, putSongs } from "./firebase";

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

/** Validates if and incoming email has the format something@something.com, if not will return an error
 * @param email - String: Email to verify
 * @returns boolean with the confirmation if it is valid or not.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/** Validates if and incoming password has at least 10 characters, one lowercase letter, one
  uppercase letter and one of the following characters: !, @, #, ? or ].
 * @param password - String: password to verify
 * @returns boolean with the confirmation if it is valid or not.
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#\]])[A-Za-z\d@!#\]]{10,}$/;
  return passwordRegex.test(password);
};

/** Retrieves and user from the database, here is only managed the error of type connection. is mocked for testing purposes.
 * @param email - String: password to verify
 * @returns Result of the SQL statement consult.
 */
export const validateExistingEmail = async (email: string): Promise<any> => {
  const users = await getUsers(db);
  return users.find((user: any) => {
    return user.email === email;
  });
};

/**
 * Validates if the incoming email and password matchs with an registered user.
 * @param email Email to verify.
 * @param password Password to verify.
 * @returns Object with the user data.
 */
export const validateUserCredentials = async (
  email: string,
  password: string
) => {
  const users = await getUsers(db);
  return users.find((user: any) => {
    return user.email === email && user.password === password;
  });
};

/**
 * Generates a JWT token with the incoming email and the secret key specified.
 * @param email Email to include in the JWT body.
 * @returns JWT token with the specified data.
 */
export const generateJwtToken = (email: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.EXPIRATION_JWT_TIME },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

/**
 * Creates an incoming user in the firebase DB.
 * @param email - String: email to create.
 * @param password - String: password to crete.
 * @returns Firebase metadata of creation.
 */
export const createUserInDB = async (email: string, password: string) => {
  const response = await postUser(db, email, password);
  return response;
};

/**
 * Retrieves all the songs from the DB.
 * @returns Array with all the objects in the DB.
 */
export const getSongsFromDB = async () => {
   const songs = await getSongs(db);
   return songs
}

/**
 * Creates a new object in the song collection in the firebase database.
 * @param song - musicSchema: Song to create
 * @returns Response with the song metadata.
 */
export const postSongInDB = async (song: any) => {
  const response = await postSongs(db, song);
  return response
}

/**
 * Creates a new object in the song collection in the firebase database.
 * @param song - musicSchema: Song to create
 * @returns Response with the song metadata.
 */
 export const putSongInDB = async (song: any) => {
  const response = await putSongs(db, song);
  return response
}