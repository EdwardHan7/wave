# Wave Software Development Challenge

Instructions on how to build/run your application
Clone the repository to your local machine
Navigate to the project directory in the terminal
Run npm install to install all dependencies
Start the server by running node server.js (or npm start if you have a start script defined in your package.json)
The application runs on localhost:3000 by default. You can change the port by modifying the value in the server.js file.

Testing
The correctness of the implementation was verified by running a series of tests which include unit tests, integration tests, and end-to-end tests. For unit tests, the individual functions were tested to ensure they work as expected. For integration and end-to-end tests, test CSV files were used to verify the functionalities like file upload and payroll report generation.

Production Environment Considerations
If this application was destined for a production environment, the following would be added or changed:

Error Handling and Logging: Implement better error handling and logging for easier troubleshooting and monitoring.
Authentication and Authorization: Secure the endpoints and only allow authorized users to access the services.
Input Validation: All inputs (including CSV files) would be validated before processing.
Environment Configuration: Use environment variables for sensitive data like database connection details.
Performance Optimization: Implement caching and other performance optimization strategies.
Testing: More robust and comprehensive testing, including load and stress testing.
Compromises
Due to the time constraints of this challenge, a few compromises had to be made:

Limited Testing: Due to the time constraint, I was not able to write extensive tests for all scenarios.
Error Handling: The application's error handling is fairly basic and may not account for all potential issues.
Frontend: The application currently lacks a frontend for a better user experience.
Documentation: Due to time limitations, some aspects of the application may not be fully documented.
Code Refactoring: There might be parts of the code that could be optimized or made more efficient. With more time, a refactoring could be done to improve the code quality.
