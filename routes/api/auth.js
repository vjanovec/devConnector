const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Finds user by id
// @access  PUBLIC

// router.use(auth);

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log(user);
        res.json(user);
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});



// @route   POST api/auth
// @desc    Authenticate user & get token (Login)
// @access  PUBLIC

router.post('/', [
    // Validate user input
    check('email', 'Please include a valid email').isEmail(),
    check('password', "Password is required").exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // See if user exists
    try {
        const user = await User.findOne({ email: email }) // or User.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000}, (err, token) => {
            if(err) throw err;
            res.json({ token });

        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;