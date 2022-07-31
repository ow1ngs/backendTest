import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import {
  generateJwtToken,
  validateEmail,
  validateExistingEmail,
  validatePassword,
  validateUserCredentials,
} from "src/util/utils";

import schema from "./schema";

const userAuth: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { email, password } = event.body;

  try {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      throw validationMessages.emailNotValid
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      throw validationMessages.passwordNotValid
    }
    const emailExists = validateExistingEmail(email);
    if (!emailExists) {
      throw validationMessages.userCredentialsNotVerified
    }
    const validateCredentials = await validateUserCredentials(email, password);
    if (!validateCredentials) {
      throw validationMessages.userCredentialsNotVerified
    }
    
    const userToken = await generateJwtToken(email);

    return formatJSONResponse({
      statusCode: 200,
      body: {
        success: true,
        data: userToken,
      },
    });
  } catch (error) {
    console.log("[UserAuth] Error in handler: ", error);
    return formatJSONResponse({
      statusCode: 500,
      body: {
        success: false,
        error: error,
      },
    });
  }
};

export const main = middyfy(userAuth);
