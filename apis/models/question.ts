import { isValidObjectId } from 'mongoose';
import { Question } from '~/models';
import { modelSuccessResponse, modelFailureResponse } from '~/utils';

Question.save = async data => {
  try {
    const newQuestion = new Question(data);
    const savedQuestion = await newQuestion.save();
    const retrievedQuestion = savedQuestion.toObject();
    return modelSuccessResponse(retrievedQuestion);
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Question.getQuestion = async questionId => {
  try {
    if (isValidObjectId(questionId)) {
      const retrievedQuestion = await Question.findOne({
        _id: questionId
      });
      if (retrievedQuestion) {
        return modelSuccessResponse(retrievedQuestion.toObject());
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
        return modelSuccessResponse(updatedQuestion);
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
        return modelSuccessResponse(deletedQuestion);
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
      }
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
