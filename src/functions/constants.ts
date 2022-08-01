export const validationMessages = {
  emailAndPasswordAreValid: "User created successfully.",
  emailNotValid:
    "Incoming email does not match the standards. Must be a valid email in the form user@email.com",
  passwordNotValid:
    "Incoming password does not match the standards. Password must contain: at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ]",
  emailAlreadyExists: "The incoming email already exists.",
  ErrorInDB: "Error trying to connect to DB",
  userCredentialsNotVerified: "Email or password are not valid.",
  queryParams: "Some query params are missing in the request.",
  CreatedSuccesfully: "The song was created successfully.",
  UpdatedSuccesfully: "The song was updated successfully.",
  SongDontExists: "The name of the songs that you are looking for do not exists or the song that you are trying to modify was not created by you.",
  AuthorizationHeader: "No authorization header is presented in the request.",
  SongAlreadyExist: "This song name already exists in your collection.",
  visibilityNotRecognized: "The value that you provide for visibility is not recognized, should be public, private or mysongs.",
  invalidToken: "The incoming token has expired or is invalid.",
  DocumentDontExist: "The song that you are trying to update does not exist.",
  SongDontCreatedByUser: "The song that you are trying to update was not created by you."
};
