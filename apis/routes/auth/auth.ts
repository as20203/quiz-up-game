import { Router } from 'express';
import { login, verifyToken } from '~/controllers';
import { authenticationHandler } from '~/middleware';

export const authenticationRouter = Router();

authenticationRouter.post('/login', authenticationHandler('local.one'), login);

authenticationRouter.post('/verify-token', authenticationHandler('jwt'), verifyToken);
