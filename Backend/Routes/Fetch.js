const express = require('express');
const User = require("../Model/User");
const Subjects = require('../Model/Subjects');

const router = express.Router();

router.post('/faculty', async (req, res) => {
    try {
        const faculty = await User.find({ role: "Faculty", department : req.body.department}); // Use await to wait for the promise to resolve
        res.send(faculty);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

router.post('/subject', async(req, res) => {
    try {
        const subject = await Subjects.find({ year : req.body.year}); // Use await to wait for the promise to resolve
        res.send(subject);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
})

module.exports = router;
