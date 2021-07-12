import { Request, Response, Router } from "express";

import { authenticateToken } from "../../utilities/authentication";

const router: Router = Router();

router.get("/user", (req, res, next) => authenticateToken(req, res, next));

router.get("/user", (req, res, next) => console.log("hello!"));

export const Register: Router = router;
