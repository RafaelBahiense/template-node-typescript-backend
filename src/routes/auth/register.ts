import { Request, Response, Router } from "express";

import register from "../../controllers/auth/register";

const router: Router = Router();

router.post("/register", (req: Request, res: Response) => register(req, res));

export const Register: Router = router;
