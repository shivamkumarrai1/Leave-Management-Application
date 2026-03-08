const Leave = require("../models/Leave");


// View all leave requests
exports.getAllLeaves = async(req, res) => {
    try {

        const leaves = await Leave.find()
            .populate("employee", "name email")
            .sort({ createdAt: -1 });

        res.json(leaves);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Approve Leave
exports.approveLeave = async(req, res) => {
    try {

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        leave.status = "APPROVED";

        await leave.save();

        res.json({
            message: "Leave approved",
            leave
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Reject Leave
exports.rejectLeave = async(req, res) => {
    try {

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        leave.status = "REJECTED";

        await leave.save();

        res.json({
            message: "Leave rejected",
            leave
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};