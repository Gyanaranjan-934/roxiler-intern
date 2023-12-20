import { asyncHandler } from '../../utils/asyncHandler.js';
import {Product} from '../models/product.js';

const getProductCategories = asyncHandler(async (req, res) => {
  const { month } = req.query;

  try {
    let result;
    if (month) {
      result = await Product.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
            },
          },
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json(result);
    }
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default getProductCategories;
