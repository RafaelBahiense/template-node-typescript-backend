import { Router } from "express";

import register from "../../controllers/auth/register";

const router: Router = Router();

router.post("/register", register);

export const Register: Router = router;
