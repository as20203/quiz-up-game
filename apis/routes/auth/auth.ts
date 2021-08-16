import { Router } from 'express';
import { login } from '~/controllers';
import { authenticationHandler } from '~/middleware';

export const authenticationRouter = Router();

authenticationRouter.post('/login', authenticationHandler('local.one'), login);
