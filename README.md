# GDSC Uniserver Designer Technical Assessment


DatabaseSample.db is a sample database with values already inserted as an example. 

Following the steps below will create a new empty database the first time the program is run.

###### NOTE: 
While you can use your browser to test GET requests, you will need a different tool to test other requests. I recommend using Postman for testing all POST, PUT and DELETE requests. 
      
      
-----------------------------------------------------------------------------------------------------------------------------------
## {Request Endpoint --> Function | Type of Request}

get_employee --> gets a specific employee's information given the employee id | GET

add_employee --> adds an employee to the database with the given name, department id and salary | POST

add_department --> adds a department to the database with the given name | POST

update_salary --> updates the salary of an employee given the employee id and new salary | PUT

terminate_employee --> removes an employee's information from the database given the employee id | DELETE

-----------------------------------------------------------------------------------------------------------------------------------



### STEPS TO RUN: 

1. In a terminal, type "cd UniserverTechnicalAssessment" to open the directory.
2. Type "npm run start" --> This will create the server and run it on port 8000. This also creates the empty SQLite database that will be used.
3. Navigate to your browser and enter the following URL: http://localhost:8000/. A message saying "Running successfully" should be displayed.
4. To start, you will need to insert employees and departments to the database. 
5. To add a department, use the following request URL: http://localhost:8000/api/add_department/. You will also need to insert the name of the department in the body of the request on Postman.
6. To add an employee, use the following request URL: http://localhost:8000/api/add_employee/. You will need to insert a name, department id and salary for the employee in the body of the request on Postman.
7. To fetch the information of a specific employee, use the following request URL: http://localhost:8000/api/get_employee/:id. Replace ":id" with the employee id of the employee who you'd like to get the information of.
8. To update the salary of an employee, use the following request URL: http://localhost:8000/api/update_salary/:id. Replace ":id" with the employee id of the employee you'd like to update the salary for.
9. To delete an employee, use the following request URL: http://localhost:8000/api/terminate_employee/:id. Replace ":id" with the employee id of the employee you'd like to delete.
