import { validationMessages } from "@functions/constants";
import * as jwt from "jsonwebtoken";

export const jwtValidation = async (jwtToken: string, secretKey: string) => {
  try {
    const decodedToken = await tokenDecodification(jwtToken, secretKey);
    return {
      sucess: true,
      decodedToken
    };
  } catch (error) {
    return {
      success: false,
      error: validationMessages.invalidToken,
    };
  }
};


/**
 * Returns a decoded token if the verification is succesfully, otherwise returns the error of why the token is not valid.
 * @param jwtToken JWT token to validate.
 * @param secretKey Secret key to validate in the token.
 * @returns 
 */
const tokenDecodification = (jwtToken: string, secretKey: string): any => {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, secretKey, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
};
