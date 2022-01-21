var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "UniserverAssessmentDatabase.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    
    console.log('Connected to the database.')
    db.run('PRAGMA foreign_keys = ON;')
    /* db.run(`CREATE TABLE Employee (
      employee_id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      department_id INTEGER, 
      FOREIGN KEY (department_id) REFERENCES Department(department_id)
      )`),

    db.run(`CREATE TABLE Department (
      department_id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT NOT NULL
      )`),

    db.run(`CREATE TABLE Salary (
      employee_id INTEGER, 
      salary INTEGER, 
      FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
      ON DELETE CASCADE)
      `) */;

  })

module.exports = db