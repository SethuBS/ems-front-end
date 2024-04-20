import React, {useEffect, useState} from 'react';
import {createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService.js";
import {useNavigate, useRevalidator, useParams} from "react-router-dom";

const EmployeeComponent = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if(id){
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // Reset form fields when id is not present (i.e., when adding new employee)
            setFirstName('');
            setLastName('');
            setEmail('');
        }
    }, [id]); // Add id as a dependency to useEffect

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName:firstName,lastName:lastName,email:email};
            console.log(employee);

            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error =>{
                    console.log(error);
                })
            } else {
                createEmployee(employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error =>{
                    console.log(error);
                })
            }

        }
    }
    
    function validateForm() {
        let valid = true;
        const errorCopy = {... errors};

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Last name is required';
            valid = false; // Set valid to false only when lastName is empty
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Email is required';
            valid = false;
        }
        setError(errorCopy);
        return valid;
    }

    function pageTittle(){
        if(id) {
           return <h1 className='text-center'>Update Employee</h1>
        } else {
            return <h1 className='text-center'>Add Employee</h1>
        }
    }

    return (
        <div className='container'>
            <br/>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTittle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}/>

                                { errors.firstName && <small className='invalid-feedback'>{errors.firstName}</small> }

                            </div>
                            <div className='form-group'>
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}/>

                                { errors.lastName && <small className='invalid-feedback'>{errors.lastName}</small> }

                            </div>
                            <div className='form-group'>
                                <br/>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email Address'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}/>

                                { errors.email && <small className='invalid-feedback'>{errors.email}</small> }

                            </div>
                            <br/>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EmployeeComponent;