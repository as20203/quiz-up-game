import { Response } from 'express';
import { Request, QuizController, QuizQuery } from '~/types';
import { success, failure } from '~/utils';
import { Quiz } from '~/models';

/**
 * @swagger
 *
 * /api/quizzes/:
 *   post:
 *     tags:
 *       - Quizzes
 *     summary: Add a new Quiz
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               categoryId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully created quiz
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 */
export const addQuiz = async (request: Request<QuizController>, response: Response) => {
  try {
    const { quiz } = request;
    const newQuiz = await Quiz.save(quiz);
    if (!newQuiz.isExecuted) {
      return failure(response, newQuiz.error, `Couldn't save quiz.`);
    }
    return success(response, { quiz: newQuiz.data }, `Successfully saved quiz.`);
  } catch (error) {
    return failure(response, error.message, `Couldn't save quiz`);
  }
};

/**
 * @swagger
 *
 *  /api/quizzes/{id}:
 *   get:
 *     tags:
 *       - Quizzes
 *     summary: Get Details of a specific quiz
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the quiz to get
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const getQuiz = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const retrievedQuiz = await Quiz.getQuiz(id);
    if (!retrievedQuiz.isExecuted) {
      return failure(
        response,
        retrievedQuiz.error,
        `Couldn't retrieve quiz details.`,
        retrievedQuiz.statusCode
      );
    }
    return success(response, { quiz: retrievedQuiz.data }, 'Successfully retrieved quiz details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve quiz.`);
  }
};

/**
 * @swagger
 *
 *  /api/quizzes/:
 *   get:
 *     tags:
 *       - Quizzes
 *     summary: Get Details of a quizzes.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: string
 *        description:  categoryId of the quizzes to get
 *
 *      - in: query
 *        name: getMyQuiz
 *        schema:
 *          type: boolean
 *        description:  Get personal quizzes
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const getQuizzes = async (request: Request, response: Response) => {
  try {
    const {
      query: { categoryId, getMyQuiz },
      user: { _id, category }
    } = request;
    const quizQuery = {} as QuizQuery;
    if (category !== 'admin') {
      quizQuery.takenBy = _id;
    }
    if (getMyQuiz && getMyQuiz === 'true') {
      quizQuery.takenBy = _id;
    }
    if (categoryId) {
      quizQuery.categoryId = categoryId;
    }
    const retrievedQuizzes = await Quiz.getQuizzes(quizQuery);
    if (!retrievedQuizzes.isExecuted) {
      return failure(
        response,
        retrievedQuizzes.error,
        `Couldn't retrieve quiz details.`,
        retrievedQuizzes.statusCode
      );
    }
    return success(
      response,
      { quizzes: retrievedQuizzes.data },
      'Successfully retrieved quiz details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve quizzes.`);
  }
};
/**
 * @swagger
 *
 * /api/quizzes/{id}:
 *   patch:
 *     tags:
 *       - Quizzes
 *     summary: Update a  Specific quiz.
 *     security:
 *      - bearerAuth: []
 *
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the Quiz to update.
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               categoryId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully created quiz
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const updateQuiz = async (request: Request<Partial<QuizController>>, response: Response) => {
  try {
    const {
      quiz,
      params: { id }
    } = request;
    const updatedQuiz = await Quiz.updateQuiz(id, quiz);
    if (!updatedQuiz.isExecuted) {
      return failure(response, updatedQuiz.error, `Couldn't update quiz.`, updatedQuiz.statusCode);
    }
    return success(response, { quiz: updatedQuiz.data }, 'Successfully updated quiz details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't update quiz.`);
  }
};

/**
 * @swagger
 *
 *  /api/quizzes/{id}:
 *   delete:
 *     tags:
 *       - Quizzes
 *     summary: Delete a quiz.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the quiz to delete
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const deleteQuiz = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedQuiz = await Quiz.deleteQuiz(id);
    if (!deletedQuiz.isExecuted) {
      return failure(
        response,
        deletedQuiz.error,
        `Couldn't delete quiz details.`,
        deletedQuiz.statusCode
      );
    }
    return success(response, { quiz: deletedQuiz.data }, 'Successfully deleted quiz details.');
  } catch (error) {
    return failure(response, error.message, `Couldn't delete quiz details`);
  }
};
