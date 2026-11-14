
import {useState, useEffect} from "react"
function GetAllEmployee({employees}) {
    return(
        <div>
            <h2>Employee List</h2>
            {
                employees.map((employee)=>(
                    <div key={employee.id}>
                        <h3>ID: {employee.id}</h3>
                        <h3>Name: {employee.name}</h3>
                        <h3>Designation: {employee.designation}</h3>
                    </div>
                ))
            }

        </div>
    )

}

export default GetAllEmployee