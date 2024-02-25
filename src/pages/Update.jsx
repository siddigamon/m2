import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

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

  const navigate = useNavigate()
  const location = useLocation()

  const employeeId = location.pathname.split("/")[2]


  const handleChange = (e) => {
    setEmployees((prev)=>({...prev, [e.target.name]: e.target.value}));
  };
 

  const handleClick = async e => {
    e.preventDefault();
    try{
      await axios.put("http://localhost:8800/employees/"+ employeeId, employee) 
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
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update;