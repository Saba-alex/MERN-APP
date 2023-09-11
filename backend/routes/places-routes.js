const express = require("express");
const { check } = require("express-validator");
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

const PlacesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");


router.get("/:pid", PlacesControllers.getPlacesById);

router.get("/user/:uid", PlacesControllers.getPlacesByUserId);

router.use(checkAuth); //all route after this are secure by the token

router.post(
  "/",
  fileUpload.single('image'),//single file 
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }, check("address").not().isEmpty()),
  ],
  PlacesControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  PlacesControllers.updatePlace
);

router.delete("/:pid", PlacesControllers.deletePlace);

module.exports = router;
