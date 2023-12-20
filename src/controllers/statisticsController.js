import { Product } from "../models/product.js";

const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        let allProducts = [];
        if (month) {
            allProducts = await Product.find({ $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                }});
        }

        let totAmount = 0.0;
        let soldItems = 0;
        let unsoldItems = 0;

        if(allProducts.length>0){
            allProducts.map((product) => {
                if(product.sold)soldItems++;
                else unsoldItems++;
                totAmount+=parseFloat(product.price)
            })
        }
        totAmount = totAmount.toFixed(2);;
        res.json({
            allProducts,
            totAmount,
            soldItems,
            unsoldItems
        });
    } catch (error) {
        console.error('Error calculating statistics:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default getStatistics
