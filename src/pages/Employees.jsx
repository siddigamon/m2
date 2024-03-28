import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8800/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:8800/employees/" + id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <h1><b>EMPLOYEES</b></h1>
      <table>

        <thead>
          <tr>
            <th className='primary-key'>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td className='primary-key'>{employee.employee_id}</td>
              <td>
                {`${employee.firstname} ${employee.middlename} ${employee.lastname}`}
              </td>
              <td>
                {`${employee.addressline} ${employee.barangay} ${employee.province} ${employee.country} ${employee.zipcode}`}
              </td>
              <td className="button-container">
                <button className="delete" onClick={() => handleDelete(employee.employee_id)}>
                  Delete
                </button>
                <button className="update">
                  <Link to={`/update/${employee.employee_id}`}>Update</Link>
                </button>
                <button className="update">
                  <Link to={`/addLeaves/${employee.employee_id}`}>Add Leave</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottom-nav">
        <Link to="/add">
          <button className="add">
            ADD NEW EMPLOYEE
          </button>
        </Link>
        <Link to="/view">
          <button className="add">
            VIEW BY DEPARTMENT
          </button>
        </Link>
        <Link to="/leaves">
          <button className="add">
            VIEW BY LEAVES
          </button>
        </Link>
        <Link to="/superior">
          <button className="add">
            VIEW SUPERIOR
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Employees;