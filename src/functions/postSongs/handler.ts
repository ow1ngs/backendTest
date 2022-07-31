import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { jwtValidation } from "src/util/jwtValidator";
import { getSongsFromDB, postSongInDB } from "src/util/utils";
import schema from "./schema";

const postSongs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let response: any;
  const { artist, songName, year, album, visibility } = event.body;
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

    const songExists = await getSpecificSong(songName, responseValidation.decodedToken.data);
    if (songExists[0]) { 
      throw validationMessages.SongAlreadyExist;
    }

    const song = {
      artist,
      songName,
      year,
      album,
      visibility,
      createdBy: responseValidation.decodedToken.data,
    };

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

export const postSong = async (song: any) => {
  const response = await postSongInDB(song);
  return response;
};

export const getSpecificSong = async (songName: string, email: string) => {
  const allSongs = await getSongsFromDB();
  const specificSong = allSongs.filter(
    (item: any) =>
      item.songName.toLowerCase() === songName.toLowerCase() &&
      item.createdBy === email
  );
  return specificSong;
};

export const main = middyfy(postSongs);
