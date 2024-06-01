const express = require('express');
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_TOKEN = "secret";

router.post('/', async(req, res) => { 
    try {
        const { role, email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found", success : false });
        }
        // Check if the email and password match and the role is correct
        if (user.email === email && user.password === password && user.role === role) {
            // Respond with 200 OK and a success message
            const authToken = jwt.sign({ sub: role, name: email }, SECRET_TOKEN, { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", success : true, authToken : authToken});
        } else {
            // Respond with 401 Unauthorized if credentials don't match
            res.status(401).json({ message: "Invalid credentials", success : false});
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
    
});

module.exports = router;