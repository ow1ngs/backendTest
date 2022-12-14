import { validationMessages } from "@functions/constants";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { jwtValidation } from "src/util/jwtValidator";
import { getSongsFromDB } from "src/util/utils";
import { visibilityEnum } from "./constants";

const getSongs: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  let response: any;

  const { Authorization } = event.headers;

  const { visibility, page, pageSize } = event.queryStringParameters;

  try {
    if (!visibility || !page || !pageSize) {
      throw validationMessages.queryParams;
    }
    
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

    if (visibility !== visibilityEnum.PUBLIC && visibility !== visibilityEnum.PRIVATE && visibility !== visibilityEnum.MYSONGS) {
      throw validationMessages.visibilityNotRecognized;
    }

    if (visibility === visibilityEnum.PUBLIC) {
      response = await getPublicSongs(parseInt(page), parseInt(pageSize));
    }

    if (visibility === visibilityEnum.PRIVATE) {
      response = await getPrivateSongs(
        responseValidation.decodedToken.data,
        parseInt(page),
        parseInt(pageSize)
      );
    }

    if (visibility === visibilityEnum.MYSONGS) {
      response = await getAllMySongs(
        responseValidation.decodedToken.data,
        parseInt(page),
        parseInt(pageSize)
      );
    }

    return formatJSONResponse({
      statusCode: 200,
      body: {
        success: true,
        data: response,
      },
    });
  } catch (error) {
    console.log("[getSongs] Error in handler: ", error);
    return formatJSONResponse({
      statusCode: 500,
      body: {
        success: false,
        error: error,
      },
    });
  }
};

/**
 * This function filters and array of songs and return only the public songs.
 * @param page Number of the page to return.
 * @param pageSize Number of elements per page.
 * @returns Array with the filtered data.
 */
export const getPublicSongs = async (page: number, pageSize: number) => {
  const songs = await getSongsFromDB();
  const paginationMax = page * pageSize;
  const paginationMin =
    paginationMax === pageSize ? 0 : paginationMax - pageSize;
  const publicSongs = songs.filter(
    (item: any) => item.visibility === visibilityEnum.PUBLIC
  );
  return publicSongs.slice(paginationMin, paginationMax);
};

/**
 * This function filters and array of songs and return only the private songs that were created by the logged user.
 * @param email Email of the logged user.
 * @param page Number of the page to return.
 * @param pageSize Number of elements per page.
 * @returns Array with the filtered data.
 */
export const getPrivateSongs = async (
  email: string,
  page: number,
  pageSize: number
) => {
  const songs = await getSongsFromDB();
  const paginationMax = page * pageSize;
  const paginationMin =
    paginationMax === pageSize ? 0 : paginationMax - pageSize;
  const privateSongs = songs.filter(
    (item: any) =>
      item.visibility === visibilityEnum.PRIVATE && item.createdBy === email
  );
  return privateSongs.slice(paginationMin, paginationMax);
};

/**
 * This function filters and array of songs and return all the songs that were created by the logged user.
 * @param email Email of the logged user.
 * @param page Number of the page to return.
 * @param pageSize Number of elements per page.
 * @returns Array with the filtered data.
 */
export const getAllMySongs = async (
  email: string,
  page: number,
  pageSize: number
) => {
  const songs = await getSongsFromDB();
  const paginationMax = page * pageSize;
  const paginationMin =
    paginationMax === pageSize ? 0 : paginationMax - pageSize;
  const privateSongs = songs.filter((item: any) => item.createdBy === email);
  return privateSongs.slice(paginationMin, paginationMax);
};

export const main = middyfy(getSongs);
