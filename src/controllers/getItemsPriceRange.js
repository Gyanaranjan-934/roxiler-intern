import { asyncHandler } from '../../utils/asyncHandler.js'
import {Product} from '../models/product.js'

const getProductsInRange = asyncHandler(async(req, res)=>{
    const {month} = req.query
    
    try {
        let allProducts = [];
        if (month) {
            allProducts = await Product.find({ $expr: {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
                }});
        }
        let productCnt = [0,0,0,0,0,0,0,0,0,0];
        allProducts.map((product)=>{
            const price = product.price.toFixed(2); 
            console.log(price);
            let rem = Math.floor(price%100);
            let quo = Math.floor(price/100);
            if(price>900.00){
                productCnt[9]++;
            }else{
                if(rem==0){
                    productCnt[(quo)-1]++;
                }else{
                    productCnt[(quo)]++;
                }
            }
        })
        res.status(200).json({productCnt});

    } catch (error) {
        
    }

})

export default getProductsInRange   