import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { jwtValidation } from "src/util/jwtValidator";
import { getSongsFromDB, putSongInDB } from "src/util/utils";
import schema from "./schema";

const putSongs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  let response: any;
  const { songName, artist, year, album, visibility } = event.body;
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

    const specificSong: any = await getSpecificSong(
      songName,
      responseValidation.decodedToken.data
    );
    
    if (response) {
      throw validationMessages.SongDontExists;
    }

    const song = {
      id: specificSong[0].id,
      songName: specificSong[0].songName,
      artist,
      year,
      createdBy: specificSong[0].createdBy,
      album,
      visibility,
    };

    response = await putSong(song);

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

export const getSpecificSong = async (songName: string, email: string) => {
  const allSongs = await getSongsFromDB();
  const specificSong = allSongs.filter(
    (item: any) =>
      item.songName.toLowerCase() === songName.toLowerCase() &&
      item.createdBy === email
  );
  return specificSong;
};

export const putSong = async (song: any) => {
  const response = await putSongInDB(song);
  return response;
};

export const main = middyfy(putSongs);
