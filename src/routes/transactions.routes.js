import { Router } from "express";
import getAllTransactions from "../controllers/getTransactions.js";
const router = Router();
router.route('/get-transactions').get(getAllTransactions)
export default router;