const express = require("express");
const router = express.Router();

import {
  create,
  deleteActivity,
  edit,
  list,
  listById,
} from "../controllers/activitiesController";
import { checkToken } from "../shared/common-methods";

router.post("/create", checkToken, async (req: Request, res: Response) => {
  await create(req, res);
});

router.get("/", checkToken, async (req: Request, res: Response) => {
  await list(req, res);
});
router.get("/:id", checkToken, async (req: Request, res: Response) => {
  await listById(req, res);
});

router.put("/edit/:id", checkToken, async (req: Request, res: Response) => {
  await edit(req, res);
});

router.delete("/:id", checkToken, async (req: Request, res: Response) => {
  await deleteActivity(req, res);
});

module.exports = router;
