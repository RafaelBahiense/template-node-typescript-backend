import { Request, Response, Router } from "express";

const router: Router = Router();

router.post("/register", () => console.log("oi"));

export const Register: Router = router;
