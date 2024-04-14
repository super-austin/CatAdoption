export const errorMsgs = {
  UserHealthCheck: 'User Service is working!',
  UserAlreadyExists: 'User already exists',
  UserCreated: 'User Created',
  InvalidPassword: 'Invalid Password',
  UserNotFound: 'User not found',
  CatHealthCheck: 'Cats Service is working!',
  CreateCatError: 'Error happened while creating cat',
  CatNotFound: 'Cat not found!',
};

export const environmentVariables = {
  PROVIDER_URL: process.env.PROVIDER_URL || '',
  ACCOUNT_ADDRESS: process.env.ACCOUNT_ADDRESS || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  APP_NAME: process.env.APP_NAME || '',
};
