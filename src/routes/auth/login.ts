import { Router } from "express";

import login from "../../controllers/auth/loginController";

const router: Router = Router();

router.post("/login", login);

export const Login: Router = router;
