import { Router } from "express";
import { body } from "express-validator";
import { loggedInMiddleware } from "../middleware/loggedIn.js";
import Group from "../models/Group.js";
import Account from "../models/Account.js";
import { sendError } from "../utils/error.js";
import { validateErrorsMiddleware } from "../middleware/validateErrorsMiddleware.js";


const router = Router();

router.get("/",
    loggedInMiddleware,
    async (req, res) => {
        const { user_id } = req.token;
        try {
            const groups = await Account.getGroups(user_id);
            res.send({
                user: user_id,
                groups,
            });
        } catch (error) {
            sendError(error, res);
        }

    });

router.post("/",
    loggedInMiddleware,
    body("name").exists().isString().notEmpty(),
    validateErrorsMiddleware,
    async (req, res) => {
        const { name } = req.body;
        const { user_id } = req.token;
        try {
            const newGroup = await Group.add(name);
            const account = await Account.add({groupId: newGroup.id, userId:user_id});

            res.status(201).send({
                createdGroup: newGroup.name,
                createdAccount: account,
            });
        } catch (error) {
            sendError(error, res);
        }
    }
);


export default router;