import { asyncHandler } from '../../utils/asyncHandler.js';
import { Product } from '../models/product.js';

const getProductCategories = asyncHandler(async (req, res) => {
    
    try {
        const { month } = req.query;
        if (month) {
            let result = await Product.aggregate([
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
        }else{
            res.status(404).json({ message: "Please select a month first" })
        }
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default getProductCategories;
