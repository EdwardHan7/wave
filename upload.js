const csv = require('csv-parser');
const fs = require('fs');
const moment = require('moment');
const { TimeReport, Employee } = require('./database');
const { Op } = require('sequelize');

module.exports = function(app, upload) {
  app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file);

    const reportId = parseInt(req.file.originalname.split('-')[2]);

    // Check if report ID already exists
    const existingReport = await TimeReport.findOne({ where: { reportId: reportId } });
    if (existingReport) {
      return res.status(400).json({ error: 'Report ID already exists.' });
    }

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        console.log('Row:', row); // Log the row object
        results.push(row);
      })
      .on('end', async () => {
        for (let row of results) {
          console.log('Processing Row:', row); // Log the row object

          const employee = await Employee.findOne({
            where: { id: row['employee id'] },
          });

          console.log('Employee:', employee); // Log the employee object

          if (!employee) {
            console.log('Employee not found. Creating new employee...');
            const createdEmployee = await Employee.create({
              id: row['employee id'],
              job_group: row['job group'],
            });
            console.log('Created Employee:', createdEmployee); // Log the created employee object

            await TimeReport.create({
              reportId: reportId,
              date: moment(row.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
              hours_worked: parseFloat(row['hours worked']),
              employeeId: createdEmployee.id,
            });
          } else {
            await TimeReport.create({
              reportId: reportId,
              date: moment(row.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
              hours_worked: parseFloat(row['hours worked']),
              employeeId: employee.id,
            });
          }
        }

        res.json({ message: 'File uploaded successfully' });
      });
  });
};
