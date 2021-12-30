import { Router } from "express";
import { body } from "express-validator";
import { loggedInMiddleware } from "../middleware/loggedIn.js";
import { sendError } from "../utils/error.js";
import Bill from "../models/Bill.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";

const router = Router();

router.get("/:id",
    loggedInMiddleware,
    async (req, res) => {
        const groupId = Number(req.params.id);
        try {
            const bills = await Bill.getAll(groupId);
            res.send({
                groupId,
                bills,
            });
        } catch (error) {
            sendError(error, res);
        }
    });

router.post("/",
    loggedInMiddleware,
    body(["groupId", "amount", "description"]).exists(),
    body("amount").isDecimal().isNumeric(),
    body("groupId").isInt(),
    validateErrorsMiddleware,
    async (req, res) => {
        const {groupId, amount, description} = req.body;
        try {
            const bill = await Bill.add({groupId, amount, description});
            res.status(201).send({
                bill,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
);

export default router;