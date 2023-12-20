import { asyncHandler } from '../../utils/asyncHandler.js'
import { Product } from '../models/product.js'

const getProductsInRange = asyncHandler(async (req, res) => {
    try {
        const { month } = req.query
        if (month) {
            let allProducts = [];
            allProducts = await Product.find({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                }
            });
            let productCnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            allProducts.map((product) => {
                const price = product.price.toFixed(2);
                console.log(price);
                let rem = Math.floor(price % 100);
                let quo = Math.floor(price / 100);
                if (price > 900.00) {
                    productCnt[9]++;
                } else {
                    if (rem == 0) {
                        productCnt[(quo) - 1]++;
                    } else {
                        productCnt[(quo)]++;
                    }
                }
            })
            res.status(200).json({ productCnt });
        } else {
            res.status(404).json({ message: "Please select a month first" })
        }

    } catch (error) {
        console.error('Error fetching product price ranges:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

export default getProductsInRange   