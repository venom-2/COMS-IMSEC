const express = require('express');
const Subjects = require('../Model/Subjects');
const Student = require('../Model/Student');
const User = require('../Model/User');
const Marks = require('../Model/Marks');

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

const validateIMSECEmail = (email) => {
    // Regular expression to match the specific pattern of IMSEC email addresses
    const imsecEmailPattern = /^[ab]\d{4}(cs|it|ec|ee|me|ce)\d{4}@imsec\.ac\.in$/;

    return imsecEmailPattern.test(email);
};

router.post('/student', async(req, res) => {
    try {
        const { name, rollNumber, year, branch, section, email } = req.body;
        if(!validateIMSECEmail(email)) {
            return res.status(400).json({ message: "Invalid email", success: false });
        }
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

router.post('/marks', async (req, res) => {
    try {
        const { studentId, rollNumber, ct, subject, year, branch, section, marks } = req.body;

        const newMark = await Marks.create({ studentId, rollNumber, ct, year, branch, subject, section, marks });
        res.status(200).json({ message: "Marks added successfully", success: true });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
});


module.exports = router;