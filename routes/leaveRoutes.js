import express from "express";

import {
    applyLeave,
    getLeaves,
    approveLeave,
    rejectLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

/* =========================
   LEAVE ROUTES
========================= */

router.post(
    "/apply-leave",
    applyLeave
);

router.get(
    "/leaves",
    getLeaves
);

router.put(
    "/approve-leave/:id",
    approveLeave
);

router.put(
    "/reject-leave/:id",
    rejectLeave
);

export default router;