import { Response } from 'express';
import { UserController, Request } from '~/types';
import { success, failure } from '~/utils';
import { User } from '~/models';

/**
 * @swagger
 *
 * /api/users/:
 *   post:
 *     tags:
 *       - User
 *     summary: Add a new User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [player, contributor, admin]
 *     responses:
 *       200:
 *         description: Successfully created user
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 */
export const addUser = async (request: Request<UserController>, response: Response) => {
  try {
    const { client } = request;
    const newUser = await User.save(client);
    if (!newUser.isExecuted) {
      return failure(response, newUser.error, `Couldn't save user.`);
    }
    return success(response, { user: newUser.data }, `Successfully saved user.`);
  } catch (error) {
    return failure(response, error.message, `Couldn't save user`);
  }
};

/**
 * @swagger
 *
 *  /api/users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get Details of a specific user
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the User to get
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const getUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const retrievedUser = await User.getUser(id);
    if (!retrievedUser.isExecuted) {
      return failure(
        response,
        retrievedUser.error,
        `Couldn't retrieve user details.`,
        retrievedUser.statusCode
      );
    }
    return success(response, { user: retrievedUser.data }, 'Successfully retrieved user details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve user`);
  }
};

/**
 * @swagger
 *
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update a  Specific user.
 *     security:
 *      - bearerAuth: []
 *
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the User to update.
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [player, contributor, admin]
 *
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const updateUser = async (request: Request<Partial<UserController>>, response: Response) => {
  try {
    const {
      client,
      params: { id }
    } = request;
    const updatedUser = await User.updateUser(id, client);
    if (!updatedUser.isExecuted) {
      return failure(response, updatedUser.error, `Couldn't update user.`, updatedUser.statusCode);
    }
    return success(response, { user: updatedUser.data }, 'Successfully updated user details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't update user`);
  }
};

/**
 * @swagger
 *
 *  /api/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the user to delete
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser.isExecuted) {
      return failure(
        response,
        deletedUser.error,
        `Couldn't delete user details.`,
        deletedUser.statusCode
      );
    }
    return success(response, { user: deletedUser.data }, 'Successfully deleted user details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't delete user details`);
  }
};
