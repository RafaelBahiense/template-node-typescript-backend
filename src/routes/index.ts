import { Router } from "express";

import { Register } from "./auth/register";
import { Login } from "./auth/login";

const router: Router = Router();

router.use("/", Register);
router.use("/", Login);

export const MainRouter: Router = router;
