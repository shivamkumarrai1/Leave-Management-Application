const Leave = require("../models/Leave");


// Apply Leave
exports.applyLeave = async(req, res) => {
    try {

        const { leaveType, startDate, endDate, reason } = req.body;

        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({
                message: "Start date cannot be after end date"
            });
        }

        const leave = new Leave({
            employee: req.user.id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await leave.save();

        res.status(201).json({
            message: "Leave request submitted",
            leave
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// View My Leaves
exports.getMyLeaves = async(req, res) => {
    try {

        const leaves = await Leave.find({
            employee: req.user.id
        }).sort({ createdAt: -1 });

        res.json(leaves);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};