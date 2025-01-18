const express = require("express");
const router = express.Router();

import { changePassword, deleteUserById, registerUser, searchAllUsers, searchUserById } from '../controllers/userController';
import { checkToken } from '../shared/common-methods';


router.get("/", checkToken, async (req: Request, res: Response) => {
    await searchAllUsers(req, res);
  });

router.get("/:id", checkToken, async (req: Request, res: Response) => {
  await searchUserById(req, res);
});

router.post("/register", checkToken, async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.delete("/:id", checkToken, async (req: Request, res: Response) => {
  await deleteUserById(req, res);
});

router.put(
  "/change-password/:id",
  checkToken,
  async (req: Request, res: Response) => {
    await changePassword(req, res);
  }
);

module.exports = router;