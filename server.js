const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const app = express();

// Import the upload module
const setupUploadRoute = require('./upload.js');
const payrollRoutes = require('./payroll');

// Use the payroll routes
app.use('/payroll', payrollRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Payroll system API');
});

// Call the function to setup the upload route
setupUploadRoute(app, upload);

app.listen(3000, () => console.log('Server started on port 3000'));
