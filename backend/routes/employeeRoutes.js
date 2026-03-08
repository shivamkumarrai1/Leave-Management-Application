const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    applyLeave,
    getMyLeaves
} = require("../controllers/employeeController");


// Apply leave
router.post(
    "/apply-leave",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    applyLeave
);


// View my leaves
router.get(
    "/my-leaves",
    authMiddleware,
    roleMiddleware("EMPLOYEE"),
    getMyLeaves
);

module.exports = router;