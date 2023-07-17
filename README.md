# Wave Software Development Challenge

Instructions on how to build/run your application
1. Clone the repository to your local machine
2. Navigate to the project directory in the terminal
3. Run npm install to install all dependencies
4. Start the server by running node server.js (or npm start if you have a start script defined in your package.json)
5. The application runs on localhost:3000 by default. You can change the port by modifying the value in the server.js file.


Testing
For testing this implementation, I primarily used Postman, a popular API client.
The steps I followed were:
1. Unit Testing: Before integrating all the components, I tested the smallest units of code, which are the functions. This ensured that the functions were working as expected.
2. Integration Testing: After confirming that all units of code were functioning properly, I started testing how they work when combined. This helped me ensure that the data flow across various units is working as expected and the units are working in harmony.
3. Functional Testing with Postman: I used Postman to simulate client requests to the server. This involved sending various HTTP requests (GET, POST) to the server and observing the server's response.
For the POST request, I tested file uploading by sending a multipart/form-data request that included the CSV file. I then verified whether the response received was as expected.
For the GET request, I sent a request to the server to fetch the report and then inspected the returned JSON object to verify that it was structured correctly and contained the right data.


If this application was destined for a production environment, the following would be added or changed:
1. Error Handling and Logging: Implement better error handling and logging for easier troubleshooting and monitoring.
2. Authentication and Authorization: Secure the endpoints and only allow authorized users to access the services.
3. Input Validation: All inputs (including CSV files) would be validated before processing.
4. Environment Configuration: Use environment variables for sensitive data like database connection details.
5. Performance Optimization: Implement caching and other performance optimization strategies.
6. Testing: More robust and comprehensive testing, including load and stress testing.


Compromises
Due to the time constraints of this challenge, a few compromises had to be made:
1. Error Handling: The application's error handling is fairly basic and may not account for all potential issues.
2. Frontend: The application currently lacks a frontend for a better user experience.
3. Documentation: Due to time limitations, some aspects of the application may not be fully documented.
4. Code Refactoring: There might be parts of the code that could be optimized or made more efficient. With more time, refactoring could be done to improve the code quality.
5. Limited Testing: Due to the time constraint, I was not able to write extensive tests for all scenarios.

