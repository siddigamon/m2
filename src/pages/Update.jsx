import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [employee, setEmployees] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    addressline: '',
    barangay: '',
    province: '',
    country: '',
    zipcode: ''
  })

  const [departments, setDepartments] = useState([]);
  const [designationInput, setDesignationInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8800/departments');
        const departments = res.data.reduce((acc, curr) => {
          if (!acc[curr.dept_name]) {
            acc[curr.dept_name] = [];
          }
          acc[curr.dept_name].push(curr.designation_name);
          return acc;
        }, {});
        setDepartments(departments);
        setDesignationInput(departments[Object.keys(departments)[0]][0]);
        setStatusInput("Active");
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  const navigate = useNavigate()
  const location = useLocation()
  const employeeId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setEmployees((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleDesignationChange = (event) => {
    setDesignationInput(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusInput(event.target.value);
  };

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.put("http://localhost:8800/employees/"+ employeeId, employee) 

      const designationResponse = await axios.get(`http://localhost:8800/designation_id?name=${designationInput}`);
      const statusResponse = await axios.get(`http://localhost:8800/status_id?name=${statusInput}`);

      const assignData = {
        employee_id: employeeId,
        designation_id: designationResponse.data,
        status_id: statusResponse.data
      };

      axios.post('http://localhost:8800/assign_designation-update', assignData)
      .then(response => {
          console.log(response.data);
          setDesignationInput("");
          setStatusInput("");
      })
      .catch(error => {
          console.error('There was an error!', error);
      });

      navigate('/') 
    } catch(err){
      console.log(err)
    }
  }

  console.log(employee)
  return (
    <div className='form'> 
      <h1>Update Employee</h1>
          <input type = "text" placeholder = "First Name"  onChange={handleChange} name ="firstname"/>
          <input type = "text" placeholder = "Middle Name" onChange={handleChange} name="middlename"/>
          <input type = "text" placeholder = "Last Name" onChange={handleChange} name="lastname"/>
          <input type = "text" placeholder = "Address Line" onChange={handleChange} name="addressline"/>
          <input type = "text" placeholder = "Barangay" onChange={handleChange} name="barangay"/>
          <input type = "text" placeholder = "Province" onChange={handleChange} name="province"/>
          <input type = "text" placeholder = "Country" onChange={handleChange} name="country"/>
          <input type = "text" placeholder = "Zipcode" onChange={handleChange} name="zipcode"/>
      <select name='department' value={employee.department} onChange={handleChange}>
        {Object.keys(departments).map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
      <select name='designation' value={designationInput} onChange={handleDesignationChange}>
        {employee.department &&
          departments[employee.department].map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
      </select>
      <select name="status" id={statusInput} onChange={handleStatusChange}>
        <option value="Active">Active</option>
        <option value="Resign">Resign</option>
        <option value="A.W.O.L">A.W.O.L</option>
      </select>
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}
 
export default Update;