import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from "../services/EmployeeService.js";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id)
            .then((response) => {
                getAllEmployees();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <h1 className='text-center'>List of Employees</h1>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employeeData =>
                        <tr key={employeeData.id}>
                            <td>{employeeData.id}</td>
                            <td>{employeeData.first_name}</td>
                            <td>{employeeData.last_name}</td>
                            <td>{employeeData.email_address}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employeeData.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employeeData.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
