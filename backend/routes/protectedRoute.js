const express = require('express');
const router = express.Router();

// Used to check if the accessToken is still valid or not!
router.get('/', (req, res) => {
    res.sendStatus(200);
})

module.exports = router