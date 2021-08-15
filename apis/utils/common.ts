import { compare } from 'bcryptjs';

//Below function compares password and its hash
export const comparePasswordHash = async (password: string, hash: string) => {
  const match = await compare(password, hash);
  return match;
};
