import { compare, hash } from 'bcryptjs';
import { Secret, sign, SignOptions } from 'jsonwebtoken';
const environment = process.env;
//Below function compares password and its hash
export const comparePasswordHash = async (password: string, hash: string) => {
  const match = await compare(password, hash);
  return match;
};
//Below fuction generate hash from a password
export const generateHash = async (password: string) => {
  const saltRounds = 10;
  const passwordHash = await hash(password, saltRounds);
  return passwordHash;
};

export const getSignedJwt = async (body: Record<string, string | boolean>, rememberMe = false) => {
  //Sign the JWT token and populate the payload with the user email and id
  const options: SignOptions = {};
  if (rememberMe) {
    options.expiresIn = '30d';
  } else {
    options.expiresIn = '1d';
  }
  const secret: Secret = environment.JWT_SECRET ? environment.JWT_SECRET : 'abc';
  const token = sign({ user: body }, secret, options);
  return token;
};
