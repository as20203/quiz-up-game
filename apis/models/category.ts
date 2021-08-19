import { isValidObjectId } from 'mongoose';
import { Category } from '~/models';
import { modelSuccessResponse, modelFailureResponse } from '~/utils';

Category.save = async data => {
  try {
    const newCategory = new Category(data);
    const savedCategory = await newCategory.save();
    const retrievedCategory = savedCategory.toObject();
    return modelSuccessResponse(retrievedCategory);
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Category.getCategory = async categoryId => {
  try {
    if (isValidObjectId(categoryId)) {
      const retrievedCategory = await Category.findOne({
        _id: categoryId
      });
      if (retrievedCategory) {
        return modelSuccessResponse(retrievedCategory.toObject());
      } else {
        return modelFailureResponse(`Couldn't find category.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find category.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Category.updateCategory = async (categoryId, data) => {
  try {
    if (isValidObjectId(categoryId)) {
      const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId }, data, {
        new: true,
        runValidators: true,
        context: 'query'
      }).exec();
      if (updatedCategory) {
        return modelSuccessResponse(updatedCategory.toObject());
      } else {
        return modelFailureResponse(`Couldn't find category.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find category.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Category.deleteCategory = async categoryId => {
  try {
    if (isValidObjectId(categoryId)) {
      const deletedCategory = await Category.findOneAndDelete(
        {
          _id: categoryId
        },
        { select: { addedOn: 0 } }
      );
      if (deletedCategory) {
        return modelSuccessResponse(deletedCategory.toObject());
      } else {
        return modelFailureResponse(`Couldn't find category.`, 404);
      }
    } else {
      return modelFailureResponse(`Couldn't find category.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};

Category.getCategories = async (conditions = {}) => {
  try {
    const retrievedCategories = await Category.aggregate([
      {
        $match: conditions
      }
    ]);
    if (retrievedCategories.length > 0) {
      return modelSuccessResponse(retrievedCategories);
    } else {
      return modelFailureResponse(`Couldn't find category.`, 404);
    }
  } catch (error) {
    return modelFailureResponse(error.message);
  }
};
