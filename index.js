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

app.get("/departments", (req, res) => {
    const q = `SELECT m2.departments.dept_name, m2.designation.designation_name
    FROM 
    m2.departments
   INNER JOIN m2.designation on m2.departments.departments_id = m2.designation.departments_id`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    
    })
})

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM m2.employees"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    
    })
})



app.get("/employees/view/:dept_name", (req, res) => {
    const q = `
    SELECT 		
        m2.departments.dept_name,
        m2.employees.lastname,
        m2.employees.firstname,
        m2.designation.designation_name,
        m2.status.status_name
    FROM 
    m2.assign_designation
    INNER JOIN 
        m2.employees ON m2.assign_designation.employee_id = m2.employees.employee_id
    INNER JOIN 
        m2.designation ON m2.assign_designation.designation_id = m2.designation.designation_id
    INNER JOIN
        m2.departments ON m2.designation.departments_id = m2.departments.departments_id
    INNER JOIN 
        m2.status ON m2.assign_designation.status_id = m2.status.status_id
    WHERE
    m2.departments.dept_name = ?;
    `;

    db.query(q, [req.params.dept_name], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });

    
});

app.get("/designation_id", (req, res) => {
    const q = "SELECT designation_id FROM m2.designation WHERE designation_name = ?"
    db.query(q, [req.query.name], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0].designation_id)
    })
})



app.get("/status_id", (req, res) => {
    const q = "SELECT status_id FROM m2.status WHERE status_name = ?"
    db.query(q, [req.query.name], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.json({ error: 'No status found with that name' })
        return res.json(data[0].status_id)
    })
})

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
        return res.json({ employees: { employee_id: data.insertId } })
    })
})

app.post("/assign_designation", (req, res) => {
    const q = "INSERT INTO m2.assign_designation (employee_id, designation_id, status_id) VALUES (?)"
    const values = [
        req.body.employee_id,
        req.body.designation_id,
        req.body.status_id
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Designation assigned successfully!")
    })
})

app.post("/assign_designation-update", (req, res) => {
    const q = "UPDATE m2.assign_designation SET designation_id = ?, status_id = ? WHERE employee_id = ?"
    const values = [
        req.body.designation_id,
        req.body.status_id,
        req.body.employee_id
    ]

    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        return res.json("Designation updated successfully!")
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
    const employeeId = req.params.id;
    const deleteAssignDesignationQuery = "DELETE FROM m2.assign_designation WHERE employee_id = ?";
    const deleteEmployeeQuery = "DELETE FROM m2.employees WHERE employee_id = ?";

    db.query(deleteAssignDesignationQuery, employeeId, (err, data) => {
        if (err) return res.json(err);

        db.query(deleteEmployeeQuery, employeeId, (err, data) => {
            if (err) return res.json(err);
            return res.json("Employee deleted successfully!");
        });
    });
})

app.listen(8800, () => {
    console.log('Connect to backend server!')
    })
