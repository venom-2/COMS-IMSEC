const express = require('express');
const User = require('../Model/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findOne({ _id: req.body.userID });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the current subjectAssigned, ensure it's a string
        let subjectAssigned = user.subjectAssigned || "";

        // Update the subjectAssigned by appending the new subjectID
        if(subjectAssigned.indexOf(req.body.subjectID) !== -1) {
            res.send({ success: false, message : "Subject already assigned!"});
            return;
        }
        subjectAssigned = subjectAssigned ? subjectAssigned + "," + req.body.subjectID : req.body.subjectID;

        // Update the user document
        await User.findOneAndUpdate(
            { _id: req.body.userID },
            { subjectAssigned: subjectAssigned },
            { new: true } // This option returns the updated document
        );

        res.send({ success: true, message : "Subject assigned successfully!"});
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;