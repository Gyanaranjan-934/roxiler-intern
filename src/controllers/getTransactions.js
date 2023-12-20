import { asyncHandler } from "../../utils/asyncHandler.js";
import { Product } from "../models/product.js";
import { ApiResponse } from '../../utils/ApiResponse.js'

const getAllTransactions = asyncHandler(async (req, res) => {
    try {
        const { month, searchName, pageNumber, itemsPerPage } = req.query;

        const filter = {
            $or: [
                { name: { $regex: searchName, $options: 'i' } },
                { description: { $regex: searchName, $options: 'i' } },
                { category: { $regex: searchName, $options: 'i' } },
                { price: parseFloat(searchName) || 0 },
            ],
        };

        if (month) {
            filter.$expr = {
                $and: [
                    { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
                ],
            };
        }

        
        const results = await Product.find(filter)
            .skip((pageNumber - 1) * itemsPerPage)
            .limit(parseInt(itemsPerPage));

        res.status(200).json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default getAllTransactions;
