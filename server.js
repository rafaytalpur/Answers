var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

//-------------------------------------------------------------------------------------------------
app.get("/api/get_employee/:id", (req, res, next) => {
    
    var sql = "SELECT Employee.name as name, Department.name as department, Salary FROM Employee INNER JOIN Department ON Employee.department_id = Department.department_id INNER JOIN Salary ON Employee.employee_id = Salary.employee_id WHERE Employee.employee_id = ?"
    var params = [req.params.id]
    
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row

        })
    });
});
//-------------------------------------------------------------------------------------------------
app.post("/api/add_employee/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.department_id){
        errors.push("No department id specified");
    }
    if (!req.body.salary){
        errors.push("No salary specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        department_id : req.body.department_id,
        salary : req.body.salary
    }

    var sql ='INSERT INTO Employee (name, department_id) VALUES (?,?)'
    var params =[data.name, data.department_id]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        currentid = this.lastID

        db.run(
            `INSERT INTO Salary (employee_id, salary) VALUES (?,?)`,
            [currentid, data.salary],
            function (err, result)  {
                if (err){
                    res.status(400).json({"error": res.message})
                    return;
                }
                
                var sql = "SELECT Employee.name as name, Department.name as department, Salary FROM Employee INNER JOIN Department ON Employee.department_id = Department.department_id INNER JOIN Salary ON Employee.employee_id = Salary.employee_id WHERE Employee.employee_id = ?"
                var params = [currentid]
                
                db.get(sql, params, (err, row) => {
                    if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                    }
                    res.json({
                        "message":"success",
                        "data":row
            
                    })
                });
        });
    })
});
//-------------------------------------------------------------------------------------------------
app.post("/api/add_department/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name
    }
    var sql ='INSERT INTO Department (name) VALUES (?)'
    var params =[data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//-------------------------------------------------------------------------------------------------
app.put("/api/update_salary/:id", (req, res, next) => {
    var data = {
        salary: req.body.salary
    }
    db.run(
        `UPDATE Salary set salary = COALESCE(?,salary) WHERE employee_id = ?`,
        [data.salary, req.params.id],
        function (err, result)  {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            
            var sql = "SELECT Employee.name as name, Department.name as department, Salary FROM Employee INNER JOIN Department ON Employee.department_id = Department.department_id INNER JOIN Salary ON Employee.employee_id = Salary.employee_id WHERE Employee.employee_id = ?"
            var params = [req.params.id]
            
            db.get(sql, params, (err, row) => {
                if (err) {
                  res.status(400).json({"error":err.message});
                  return;
                }
                res.json({
                    "message":"success",
                    "data":row
        
                })
            });
    });
})
//-------------------------------------------------------------------------------------------------
app.delete("/api/terminate_employee/:id", (req, res, next) => {
    db.run(
        'DELETE FROM Employee WHERE employee_id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
        
    });
})