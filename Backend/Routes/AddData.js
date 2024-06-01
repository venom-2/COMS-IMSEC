const express = require('express');
const Subjects = require('../Model/Subjects');
const Student = require('../Model/Student');
const User = require('../Model/User');

const router = express.Router();

router.post('/subject', async(req, res) => {
    try {
        const { subjectName, subjectCode, description, year } = req.body;
        const subject = new Subjects({ subjectName, subjectCode, description, year });
        await subject.save();
        res.status(200).json({ message: "Subject added successfully", success: true });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

router.post('/student', async(req, res) => {
    try {
        const { name, rollNumber, year, branch, section, email } = req.body;
        const student = new Student({ name, rollNumber, year, branch, section, email });
        await student.save();
        res.status(200).json({ message: "Student added successfully", success: true });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

router.post('/user', async(req, res) => {   
    try {
        const { name, role, email, password, department, subjectAssigned } = req.body;
        const user = new User({name, role, email, password, department, subjectAssigned});
        await user.save();
        res.status(200).json({ message: "User added successfully", success: true });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;