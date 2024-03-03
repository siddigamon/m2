/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Department() {

  console.log('Department component rendered');
  const [departments, setDepartments] = useState([]);
  const [designationInput, setDesignationInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state); 
  const employeeId = location.state.employeeId;
  

  useEffect(() => {
    axios.get('http://localhost:8800/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);



  const handleDesignationChange = (event) => {
    setDesignationInput(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const designationResponse = await axios.get(`http://localhost:8800/designation_id?name=${designationInput}`);
    const statusResponse = await axios.get(`http://localhost:8800/status_id?name=${statusInput}`);

    const assignData = {
        employee_id: employeeId,
        designation_id: designationResponse.data,
        status_id: statusResponse.data
    };

    axios.post('http://localhost:8800/assign_designation', assignData)
        .then(response => {
            console.log(response.data);
            setDesignationInput("");
            setStatusInput("");
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    navigate('/');
};

  return (
    <div>
      <h1>Departments</h1>
      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.departments_id}>
              <td>{department.dept_name}</td>
              <td>{department.designation_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
      
        <label>
          Designation:
          <input type="text" value={designationInput} onChange={handleDesignationChange} />
        </label>
        <label>
          Status:
          <input type="text" value={statusInput} onChange={handleStatusChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Department; */