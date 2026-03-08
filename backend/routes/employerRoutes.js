const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    getAllLeaves,
    approveLeave,
    rejectLeave
} = require("../controllers/employerController");


// View all leave requests
router.get(
    "/leaves",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    getAllLeaves
);


// Approve leave
router.patch(
    "/approve/:id",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    approveLeave
);


// Reject leave
router.patch(
    "/reject/:id",
    authMiddleware,
    roleMiddleware("EMPLOYER"),
    rejectLeave
);

module.exports = router;