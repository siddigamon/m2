import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "m2"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Welcome to our application.")
})

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM m2.employees"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    
    })
})



app.get("/employees/department/:dept_name", (req, res) => {
    const q = `
        SELECT 
            m2.employees.lastname,
            m2.employees.firstname,
            m2.departments.dept_name,
            m2.status.status_name
        FROM 
            m2.assign_designation
        JOIN 
            m2.employees ON m2.assign_designation.employee_id = m2.employees.employee_id
        JOIN 
            m2.departments ON m2.assign_designation.assign_desig_id = m2.departments.departments_id
        JOIN 
            m2.status ON m2.assign_designation.status_id = m2.status.status_id
        WHERE
            m2.departments.dept_name = ?;
    `;

    db.query(q, [req.params.dept_name], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/employees", (req, res) => {
    const q = "INSERT INTO m2.employees (firstname, middlename, lastname, addressline, barangay, province, country, zipcode) VALUES (?)"
    const values = [
        req.body.firstname,
        req.body.middlename,
        req.body.lastname,
        req.body.addressline,
        req.body.barangay,
        req.body.province,
        req.body.country,
        req.body.zipcode
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Employee added successfully!")
    })
})

app.put("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const q = "UPDATE m2.employees SET `firstname`=?, `middlename`=?, `lastname`=?, `addressline`=?, `barangay`=?, `province`=?, `country`=?, `zipcode`=? WHERE employee_id = ?"

    const values = [
        req.body.firstname,
        req.body.middlename,
        req.body.lastname,
        req.body.addressline,
        req.body.barangay,
        req.body.province,
        req.body.country,
        req.body.zipcode
    ]

    db.query(q, [...values,employeeId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Employee updated successfully!")
    })
})
app.delete ("/employees/:id", (req, res) => {
    const employeeId = req.params.id
    const q = "DELETE FROM m2.employees WHERE employee_id = ?"

    db.query(q, [employeeId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Employee deleted successfully!")
    })
})

app.listen(8800, () => {
    console.log('Connect to backend server!')
    })