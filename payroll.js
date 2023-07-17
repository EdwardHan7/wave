const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const { TimeReport, Employee } = require('./database');

router.get('/', async (req, res) => {
    try {
        const reports = await TimeReport.findAll({
            include: [Employee],
            attributes: [
                'employeeId',
                [fn('sum', col('hours_worked')), 'totalHours'],
                'date' // fetch date explicitly
            ],
            group: ['employeeId', 'date'], // group by date as well
            raw: true,
        });

        const payrollReport = reports.reduce((result, report) => {
            if (!report['employee.job_group']) {
                console.log(`Missing Employee job group for report: `, report);
                return result;
            }

            const jobGroupValue = report['employee.job_group'] === 'A' ? 20 : 30;
            const reportDate = new Date(report.date);

            const startDate = reportDate.getDate() <= 15
                ? new Date(reportDate.getFullYear(), reportDate.getMonth(), 1).toISOString().split('T')[0]
                : new Date(reportDate.getFullYear(), reportDate.getMonth(), 16).toISOString().split('T')[0];
            const endDate = reportDate.getDate() <= 15
                ? new Date(reportDate.getFullYear(), reportDate.getMonth(), 15).toISOString().split('T')[0]
                : new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0).toISOString().split('T')[0];

            const payPeriod = `${startDate} - ${endDate}`;
            const amountPaid = `$${(report.totalHours * jobGroupValue).toFixed(2)}`;

            if (!result[report.employeeId]) {
                result[report.employeeId] = {};
            }

            if (!result[report.employeeId][payPeriod]) {
                result[report.employeeId][payPeriod] = { 
                    employeeId: report.employeeId.toString(), 
                    payPeriod: { startDate, endDate }, 
                    amountPaid 
                };
            } else {
                const previousAmount = parseFloat(result[report.employeeId][payPeriod].amountPaid.slice(1));
                const currentAmount = parseFloat(amountPaid.slice(1));
                result[report.employeeId][payPeriod].amountPaid = `$${(previousAmount + currentAmount).toFixed(2)}`;
            }

            return result;
        }, {});

        // transform into the final format
        const employeeReports = Object.values(payrollReport).flatMap(employeePayrolls =>
            Object.values(employeePayrolls)
        );

        res.json({ payrollReport: { employeeReports } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while generating the payroll report.' });
    }
});

module.exports = router;
