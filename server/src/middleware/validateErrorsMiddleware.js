import { validationResult } from "express-validator";

export const validateErrorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
};
