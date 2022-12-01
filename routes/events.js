/*
 Event Routes
 /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { jwtValidator } = require("../middlewares/jwtValidator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();

// middleware para todas las rutas por debajo de el
router.use(jwtValidator);

// obtener eventos
router.get("/", getEvents);

// crear eventos
router.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

// actualizar evento
router.put(
  "/:id",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
    fieldValidator,
  ],
  updateEvent
);

// borrar evento

router.delete("/:id", deleteEvent);

module.exports = router;
