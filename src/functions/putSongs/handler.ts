import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { jwtValidation } from "src/util/jwtValidator";
import { putSongInDB } from "src/util/utils";
import schema from "./schema";

const putSongs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let response: any;
  const { id, songName, artist, year, visibility, album } = event.body;

  const { Authorization } = event.headers;

  try {
    if (!Authorization) {
      throw validationMessages.AuthorizationHeader;
    }

    const responseValidation = await jwtValidation(
      Authorization,
      process.env.JWT_SECRET_KEY
    );

    if (!responseValidation.sucess) {
      throw responseValidation.error;
    }

    const song = {
      songName,
      artist,
      year,
      visibility,
      album
    }

    Object.keys(song).forEach(key => {
      if (song[key] === undefined) {
        delete song[key];
      }
    });

    response = await putSong(song, id);

    return formatJSONResponse({
      statusCode: 200,
      body: {
        success: true,
        data: validationMessages.UpdatedSuccesfully,
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

export const putSong = async (song: any, id: string) => {
  const response = await putSongInDB(song, id);
  return response;
};

export const main = middyfy(putSongs);
