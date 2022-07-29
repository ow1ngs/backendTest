import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { jwtValidation } from "src/util/jwtValidator";
import { postSongInDB } from "src/util/utils";
import { visibilityEnum } from "./constants";
import schema from "./schema";

const postSongs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let response: any;
  const { token, artist, songName, year, album, visibility } = event.body;
  
  try {
    const responseValidation = await jwtValidation(
      token,
      process.env.JWT_SECRET_KEY
    );
    if (!responseValidation.sucess) {
      throw responseValidation.error;
    }

    const song = {
      artist,
      songName,
      year,
      album,
      visibility,
      createdBy: needCreator(visibility, responseValidation.decodedToken.data)
    }

    response = await postSong(song);

    return formatJSONResponse({
      statusCode: 200,
      body: {
        success: true,
        data: validationMessages.CreatedSuccesfully,
      },
    });
  } catch (error) {
    console.log("[postSongs] Error in handler: ", error);
    return formatJSONResponse({
      statusCode: 500,
      body: {
        success: false,
        error: error,
      },
    });
  }
};

export const needCreator = (visibility: string, email: string) => {
  if (visibility === visibilityEnum.PUBLIC) {
    return null;
  }
  if (visibility === visibilityEnum.PRIVATE) {
    return email;
  }
};

export const postSong = async (song: any) => {
  const response = await postSongInDB(song);
  return response;
};

export const main = middyfy(postSongs);
