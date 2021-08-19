import { Response } from 'express';
import { Request, CategoryController } from '~/types';
import { success, failure } from '~/utils';
import { Category } from '~/models';

/**
 * @swagger
 *
 * /api/categories/:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add a new Category
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string

 *     responses:
 *       200:
 *         description: Successfully created category
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 */
export const addCategory = async (request: Request<CategoryController>, response: Response) => {
  try {
    const { category } = request;
    const newCategory = await Category.save(category);
    if (!newCategory.isExecuted) {
      return failure(response, newCategory.error, `Couldn't save category.`);
    }
    return success(response, { category: newCategory.data }, `Successfully saved category.`);
  } catch (error) {
    return failure(response, error.message, `Couldn't save category`);
  }
};

/**
 * @swagger
 *
 *  /api/categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get Details of a specific category
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
export const getCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const retrievedCategory = await Category.getCategory(id);
    if (!retrievedCategory.isExecuted) {
      return failure(
        response,
        retrievedCategory.error,
        `Couldn't retrieve category details.`,
        retrievedCategory.statusCode
      );
    }
    return success(
      response,
      { category: retrievedCategory.data },
      'Successfully retrieved category details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve categories.`);
  }
};

/**
 * @swagger
 *
 *  /api/categories/:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get Details of a categories
 *     security:
 *      - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const getCategories = async (_: Request, response: Response) => {
  try {
    const retrievedCategories = await Category.getCategories({});
    if (!retrievedCategories.isExecuted) {
      return failure(
        response,
        retrievedCategories.error,
        `Couldn't retrieve categories details.`,
        retrievedCategories.statusCode
      );
    }
    return success(
      response,
      { category: retrievedCategories.data },
      'Successfully retrieved categories details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve categories.`);
  }
};
/**
 * @swagger
 *
 * /api/categories/{id}:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Update a  Specific category.
 *     security:
 *      - bearerAuth: []
 *
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the Category to update.
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully created category
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const updateCategory = async (
  request: Request<Partial<CategoryController>>,
  response: Response
) => {
  try {
    const {
      category,
      params: { id }
    } = request;
    const updatedCategory = await Category.updateCategory(id, category);
    if (!updatedCategory.isExecuted) {
      return failure(
        response,
        updatedCategory.error,
        `Couldn't update category.`,
        updatedCategory.statusCode
      );
    }
    return success(
      response,
      { category: updatedCategory.data },
      'Successfully updated category details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't update category.`);
  }
};

/**
 * @swagger
 *
 *  /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the category to delete
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const deleteCategory = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedCategory = await Category.deleteCategory(id);
    if (!deletedCategory.isExecuted) {
      return failure(
        response,
        deletedCategory.error,
        `Couldn't delete category details.`,
        deletedCategory.statusCode
      );
    }
    return success(
      response,
      { category: deletedCategory.data },
      'Successfully deleted category details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't delete category details`);
  }
};
