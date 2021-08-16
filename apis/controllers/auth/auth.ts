import { Response } from 'express';
import { AuthController, Request } from '~/types';
import { getSignedJwt, success, constants } from '~/utils';

/**
 * @swagger
 *
 *   /api/auth/login:
 *   post:
 *     tags:
 *       - Users - Auth
 *     summary: Login to your account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *
 *
 *     responses:
 *       200:
 *         description: login successful
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */
export const login = async (request: Request<AuthController>, response: Response) => {
  const {
    user: { _id, username, category },
    user
  } = request;
  const body = { _id, username, category };
  const token = await getSignedJwt(body);
  return success(
    response,
    {
      token,
      userId: request.user._id,
      user
    },
    constants.messages.successfulLogin
  );
};

/**
 * @swagger
 *
 *   /api/auth/verify-token:
 *   post:
 *     tags:
 *       - Users - Auth
 *     summary: Verify auth token
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: login successful
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 */

export const verifyToken = async (request: Request, response: Response) => {
  const { user } = request;
  return success(response, { user }, `Successfully retrieved user.`);
};
