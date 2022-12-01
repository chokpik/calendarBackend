/*
    Rutas de Usuarios / auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");

const { createUser, loginUser, renewToken } = require("../controllers/auth");

const router = Router();
router.post(
  "/new",
  [
    // Middleares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio, debe tener 6 caracteres").isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio, debe tener 6 caracteres").isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", [jwtValidator], renewToken);

module.exports = router;
