import { asyncHandler } from "../../utils/asyncHandler.js"
const getAllTransactions = asyncHandler(async (req, res) => {
    try {
        const { month, search, page = 1, perPage = 10 } = req.query;

        // Build the query based on the provided parameters
        const query = {
            dateOfSale: { $regex: new RegExp(`-${month}-`, 'i') },
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } },
                { price: { $regex: new RegExp(search, 'i') } },
            ],
        };

        // Execute the query with pagination
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json({ transactions });
    } catch (error) {
        console.error('Error listing transactions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default getAllTransactions