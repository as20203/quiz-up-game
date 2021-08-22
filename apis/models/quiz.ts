import { isValidObjectId } from 'mongoose';
import { Quiz } from '~/models';
import { modelSuccessResponse, modelFailureResponse } from '~/utils';

Quiz.save = async data => {
  try {
    const newQuiz = new Quiz(data);
    const savedQuiz = await newQuiz.save();
    const retrievedQuiz = savedQuiz.toObject();
    return modelSuccessResponse(retrievedQuiz);
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Quiz.getQuiz = async quizId => {
  try {
    if (isValidObjectId(quizId)) {
      const retrievedQuiz = await Quiz.findOne({
        _id: quizId
      });
      if (retrievedQuiz) {
        return modelSuccessResponse(retrievedQuiz.toObject());
      } else {
        return modelFailureResponse(`Couldn't find quiz.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find quiz.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Quiz.updateQuiz = async (quizId, data) => {
  try {
    if (isValidObjectId(quizId)) {
      const updatedQuiz = await Quiz.findOneAndUpdate({ _id: quizId }, data, {
        new: true,
        runValidators: true,
        context: 'query'
      }).exec();
      if (updatedQuiz) {
        return modelSuccessResponse(updatedQuiz.toObject());
      } else {
        return modelFailureResponse(`Couldn't find quiz.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find quiz.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Quiz.deleteQuiz = async quizId => {
  try {
    if (isValidObjectId(quizId)) {
      const deletedQuiz = await Quiz.findOneAndDelete(
        {
          _id: quizId
        },
        { select: { addedOn: 0 } }
      );
      if (deletedQuiz) {
        return modelSuccessResponse(deletedQuiz.toObject());
      } else {
        return modelFailureResponse(`Couldn't find quiz.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find quiz.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Quiz.getQuizzes = async (conditions = {}) => {
  try {
    const retrievedQuizzes = await Quiz.aggregate([
      {
        $match: conditions
      }
    ]);
    if (retrievedQuizzes.length > 0) {
      return modelSuccessResponse(retrievedQuizzes);
    } else {
      return modelFailureResponse(`Couldn't find quizzes.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};
