import { isValidObjectId } from 'mongoose';
import { User } from '~/models';
import { modelSuccessResponse, modelFailureResponse } from '~/utils';

User.save = async data => {
  try {
    const newUser = new User(data);
    const savedUser = await newUser.save();
    const retrievedUser = savedUser.toObject();
    return modelSuccessResponse(retrievedUser);
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

User.getUser = async userId => {
  try {
    if (isValidObjectId(userId)) {
      const retrievedUser = await User.findOne({
        _id: userId
      });
      if (retrievedUser) {
        return modelSuccessResponse(retrievedUser.toObject());
      } else {
        return modelFailureResponse(`Couldn't find user.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find user.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

User.updateUser = async (userId, data) => {
  try {
    if (isValidObjectId(userId)) {
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, data, {
        new: true,
        runValidators: true,
        context: 'query'
      }).exec();
      if (updatedUser) {
        return modelSuccessResponse(updatedUser);
      } else {
        return modelFailureResponse(`Couldn't find user.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find user.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

User.deleteUser = async userId => {
  try {
    if (isValidObjectId(userId)) {
      const deletedUser = await User.findOneAndDelete(
        {
          _id: userId
        },
        { select: { addedOn: 0 } }
      );
      if (deletedUser) {
        return modelSuccessResponse(deletedUser);
      } else {
        return modelFailureResponse(`Couldn't find user.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find user.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};
