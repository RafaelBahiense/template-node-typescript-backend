import { Request, Response, Router } from "express";

import login from "../../controllers/auth/login";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => login(req, res));

export const Login: Router = router;
