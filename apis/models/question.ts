import { isValidObjectId, Types } from 'mongoose';
import { Question } from '~/models';
import { modelSuccessResponse, modelFailureResponse } from '~/utils';

Question.save = async data => {
  try {
    const newQuestion = new Question(data);
    const savedQuestion = await newQuestion.save();
    const retrievedQuestion = (
      await Question.aggregate([
        {
          $match: { _id: savedQuestion._id }
        },
        {
          $lookup: {
            from: 'categories',
            let: { id: { $toObjectId: '$categoryId' } },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
              { $project: { _id: 1, name: 1 } }
            ],
            as: 'category'
          }
        },
        { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } }
      ])
    )[0];
    return modelSuccessResponse(retrievedQuestion);
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Question.getQuestion = async questionId => {
  const ObjectId = Types.ObjectId;

  try {
    if (isValidObjectId(questionId)) {
      const retrievedQuestion = (
        await Question.aggregate([
          {
            $match: { _id: ObjectId(questionId) }
          },
          {
            $lookup: {
              from: 'categories',
              let: { id: { $toObjectId: '$categoryId' } },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                { $project: { _id: 1, name: 1 } }
              ],
              as: 'category'
            }
          },
          { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } }
        ])
      )[0];
      if (retrievedQuestion) {
        return modelSuccessResponse(retrievedQuestion);
      } else {
        return modelFailureResponse(`Couldn't find question.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find question.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Question.updateQuestion = async (questionId, data) => {
  try {
    if (isValidObjectId(questionId)) {
      const updatedQuestion = await Question.findOneAndUpdate({ _id: questionId }, data, {
        new: true,
        runValidators: true,
        context: 'query'
      }).exec();
      if (updatedQuestion) {
        const retrievedQuestion = (
          await Question.aggregate([
            {
              $match: { _id: updatedQuestion._id }
            },
            {
              $lookup: {
                from: 'categories',
                let: { id: { $toObjectId: '$categoryId' } },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                  { $project: { _id: 1, name: 1 } }
                ],
                as: 'category'
              }
            },
            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } }
          ])
        )[0];
        return modelSuccessResponse(retrievedQuestion);
      } else {
        return modelFailureResponse(`Couldn't find question.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find question.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Question.deleteQuestion = async questionId => {
  try {
    if (isValidObjectId(questionId)) {
      const deletedQuestion = await Question.findOneAndDelete(
        {
          _id: questionId
        },
        { select: { addedOn: 0 } }
      );
      if (deletedQuestion) {
        return modelSuccessResponse(deletedQuestion.toObject());
      } else {
        return modelFailureResponse(`Couldn't find question.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find question.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Question.getQuestions = async (conditions = {}) => {
  try {
    const retrievedQuestions = await Question.aggregate([
      {
        $match: conditions
      },
      {
        $lookup: {
          from: 'categories',
          let: { id: { $toObjectId: '$categoryId' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { _id: 1, name: 1 } }
          ],
          as: 'category'
        }
      },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } }
    ]);
    if (retrievedQuestions.length > 0) {
      return modelSuccessResponse(retrievedQuestions);
    } else {
      return modelFailureResponse(`Couldn't find users.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};
