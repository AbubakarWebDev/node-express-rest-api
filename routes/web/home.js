const fs = require('fs');
const router = require('express').Router();

// For landing page
router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    fs.readFile(`views/home.html`, function(error, data) {
        if (error) throw error;
        res.send(data);
    });
});

module.exports = router;