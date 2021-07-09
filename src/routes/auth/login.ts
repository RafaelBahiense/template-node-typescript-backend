import { Request, Response, Router } from "express";

const router: Router = Router();

router.post("/login", () => console.log("oi"));

export const Login: Router = router;
