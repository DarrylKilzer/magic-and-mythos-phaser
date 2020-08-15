import ValuesController from "./Controllers/ValuesController.js";
import { AuthController } from "./auth/AuthController.js";
import { launch } from "../game/game.js";
class App {
  authController = new AuthController()
  valuesController = new ValuesController();
}

launch('game')
window["app"] = new App();



