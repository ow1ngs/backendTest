import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { validationMessages } from "../constants";
import { validateEmail, validatePassword, validateExistingEmail, createUserInDB } from "src/util/utils";

import schema from "./schema";

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { email, password } = event.body;

  try {
    if (!validateEmail(email)) {
      throw validationMessages.emailNotValid;
    }

    if (!validatePassword(password)) {
      throw validationMessages.passwordNotValid;
    }

    const emailAlredyExists = await validateExistingEmail(email);
    if (emailAlredyExists) {
      throw validationMessages.emailAlreadyExists;
    }

    const createdUser = await createUserInDB(email, password);
    console.log(createdUser);

    return formatJSONResponse({
      statusCode: 200,
      body: {
        success: true,
        data: validationMessages.emailAndPasswordAreValid,
      },
    });
  } catch (error) {
    console.log("[ValidateUser] Error in handler: ", error);
    return formatJSONResponse({
      statusCode: 500,
      body: {
        success: false,
        error: error,
      },
    });
  }
};

export const main = middyfy(createUser);
