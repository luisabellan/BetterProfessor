const express = require('express');


const router = express.Router();


router.get('/', (req, res) => {

    try {

        res.status(200).json({ message: 'Welcome to our API!' });

    }
    catch (err) {
        res.status(500).json({ message: 'Failed to welcome our users' });
    };
});




module.exports = router;