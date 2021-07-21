import { Router } from "express";

import register from "../../controllers/auth/registerController";

const router: Router = Router();

router.post("/register", register);

export const Register: Router = router;
