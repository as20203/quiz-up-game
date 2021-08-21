import { Response } from 'express';
import { Request, QuestionControlelr, QuestionQuery } from '~/types';
import { success, failure } from '~/utils';
import { Question } from '~/models';

/**
 * @swagger
 *
 * /api/questions/:
 *   post:
 *     tags:
 *       - Questions
 *     summary: Add a new Question
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *               text:
 *                 type: string
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               categoryId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully created question
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 */
export const addQuestion = async (request: Request<QuestionControlelr>, response: Response) => {
  try {
    const { question } = request;
    const newQuestion = await Question.save(question);
    if (!newQuestion.isExecuted) {
      return failure(response, newQuestion.error, `Couldn't save question.`);
    }
    return success(response, { question: newQuestion.data }, `Successfully saved question.`);
  } catch (error) {
    return failure(response, error.message, `Couldn't save question`);
  }
};

/**
 * @swagger
 *
 *  /api/questions/{id}:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get Details of a specific question
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the Question to get
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const getQuestion = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const retrievedQuestion = await Question.getQuestion(id);
    if (!retrievedQuestion.isExecuted) {
      return failure(
        response,
        retrievedQuestion.error,
        `Couldn't retrieve question details.`,
        retrievedQuestion.statusCode
      );
    }
    return success(
      response,
      { question: retrievedQuestion.data },
      'Successfully retrieved question details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve questions.`);
  }
};

/**
 * @swagger
 *
 *  /api/questions/:
 *   get:
 *     tags:
 *       - Questions
 *     summary: Get Details of a questions
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
export const getQuestions = async (request: Request, response: Response) => {
  try {
    const {
      user: { category, _id }
    } = request;
    const questionQuery = {} as QuestionQuery;
    if (category === 'contributor') {
      questionQuery.addedBy = _id.toString();
    }
    const retrievedQuestions = await Question.getQuestions(questionQuery);
    if (!retrievedQuestions.isExecuted) {
      return failure(
        response,
        retrievedQuestions.error,
        `Couldn't retrieve question details.`,
        retrievedQuestions.statusCode
      );
    }
    return success(
      response,
      { questions: retrievedQuestions.data },
      'Successfully retrieved question details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't retrieve categories.`);
  }
};
/**
 * @swagger
 *
 * /api/questions/{id}:
 *   patch:
 *     tags:
 *       - Questions
 *     summary: Update a  Specific question.
 *     security:
 *      - bearerAuth: []
 *
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the Question to update.
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *               text:
 *                 type: string
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               categoryId:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully created question
 *       400:
 *         description: Error from user end
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const updateQuestion = async (
  request: Request<Partial<QuestionControlelr>>,
  response: Response
) => {
  try {
    const {
      question,
      params: { id }
    } = request;
    const updatedQuestion = await Question.updateQuestion(id, question);
    if (!updatedQuestion.isExecuted) {
      return failure(
        response,
        updatedQuestion.error,
        `Couldn't update question.`,
        updatedQuestion.statusCode
      );
    }
    return success(
      response,
      { question: updatedQuestion.data },
      'Successfully updated question details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't update question.`);
  }
};

/**
 * @swagger
 *
 *  /api/questions/{id}:
 *   delete:
 *     tags:
 *       - Questions
 *     summary: Delete a question.
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description:  ObjectId of the question to delete
 *
 *     responses:
 *       200:
 *         description: Data Sent
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found.
 */
export const deleteQuestion = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const deletedQuestion = await Question.deleteQuestion(id);
    if (!deletedQuestion.isExecuted) {
      return failure(
        response,
        deletedQuestion.error,
        `Couldn't delete question details.`,
        deletedQuestion.statusCode
      );
    }
    return success(
      response,
      { question: deletedQuestion.data },
      'Successfully deleted question details.'
    );
  } catch (error) {
    return failure(response, error.message, `Couldn't delete question details`);
  }
};
