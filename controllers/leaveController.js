import Leave from "../models/Leave.js";

/* =========================
   APPLY LEAVE
========================= */

export const applyLeave = async (
    req,
    res
) => {

    try {

        const {
            employeeId,
            employeeName,
            leaveType,
            fromDate,
            toDate,
            reason,
        } = req.body;

        const leave =
            await Leave.create({
                employeeId,
                employeeName,
                leaveType,
                fromDate,
                toDate,
                reason,
            });

        res.status(201).json({
            message:
                "Leave Applied Successfully",
            leave,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

/* =========================
   GET LEAVES
========================= */

export const getLeaves = async (
    req,
    res
) => {

    try {

        const leaves =
            await Leave.find();

        res.status(200).json(leaves);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

/* =========================
   APPROVE LEAVE
========================= */

export const approveLeave =
    async (req, res) => {

        try {

            const leave =
                await Leave.findById(
                    req.params.id
                );

            if (!leave) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Leave not found",
                    });

            }

            leave.status =
                "Approved";

            await leave.save();

            res.status(200).json({
                message:
                    "Leave Approved",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });

        }

    };

/* =========================
   REJECT LEAVE
========================= */

export const rejectLeave =
    async (req, res) => {

        try {

            const leave =
                await Leave.findById(
                    req.params.id
                );

            if (!leave) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Leave not found",
                    });

            }

            leave.status =
                "Rejected";

            await leave.save();

            res.status(200).json({
                message:
                    "Leave Rejected",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });

        }

    };