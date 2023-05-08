import { Router } from "express";
import * as UserController from "../controllers/userController";
import * as TaskController from "../controllers/taskController";

const router = Router();

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.get("/deleteUser/(:id)", UserController.deleteUser);
router.post("/updateUser", UserController.updateUser);

router.post("/createTask", TaskController.createTask);
router.post("/updateTask", TaskController.updateTask);
router.get("/getTask", TaskController.getTask);
router.get("/removeTask/(:id)", TaskController.removeTask);

export default router;
