/*import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Add = () => {
  const [employee, setEmployees] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    addressline: '',
    barangay: '',
    province: '',
    country: '',
    zipcode: '',
    department: '',
    designation: '',
    status: ''
  })

  const handleChange = (e) => {
    setEmployees((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);


  const handleClick = async e => {
    e.preventDefault();
    setLoading(true);

    try{
      const response = await axios.post("http://localhost:8800/employees", employee);
      console.log(response.status); // Add this line
      console.log(response.data); // Add this line  
      const employeeId = response.data.employees.employee_id; // replace 'id' with the actual key for the employee id in the response
      console.log(employeeId); // Add this line
      navigate('/departments', { state: { employeeId } });
      
    } catch(err){
      console.log(err)
    }
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className='form'>
      <h1>Registration Form</h1>
          <input type = "text" placeholder = "First Name"  onChange={handleChange} name ="firstname"/>
          <input type = "text" placeholder = "Middle Name" onChange={handleChange} name="middlename"/>
          <input type = "text" placeholder = "Last Name" onChange={handleChange} name="lastname"/>
          <input type = "text" placeholder = "Address Line" onChange={handleChange} name="addressline"/>
          <input type = "text" placeholder = "Barangay" onChange={handleChange} name="barangay"/>
          <input type = "text" placeholder = "Province" onChange={handleChange} name="province"/>
          <input type = "text" placeholder = "Country" onChange={handleChange} name="country"/>
          <input type = "text" placeholder = "Zipcode" onChange={handleChange} name="zipcode"/>

        

          <button className="formButton" onClick={handleClick}>Add Department</button>

    </div>
  )
}

export default Add