import { useState, useEffect } from 'react'
import CreateEmployee from "./assets/components/CreateEmployee.jsx";
import GetAllEmployee from "./assets/components/GetAllEmployee.jsx";
import DeleteEmployee from "./assets/components/DeleteEmployee.jsx";
import UpdateEmployee from "./assets/components/UpdateEmployee.jsx";
import GetByIdEmployee from "./assets/components/GetByIdEmployee.jsx";


function App() {

    const[employees , setEmployee] = useState([])
    const[loading, setLoading] = useState(true)

    function fetchEmployee(){
        fetch("http://localhost:8080/employee")
            .then((resp)=>resp.json())
            .then((data)=>{
                setEmployee(data)
            })
            .finally(()=>{
                setLoading(false)
            })
    }
    useEffect(()=>{
        fetchEmployee()
    },[])
    if(loading){
        return <p>Loading...</p>
    }

  return (
   <>
       <CreateEmployee onEmployeeAdded={fetchEmployee}/>
       <UpdateEmployee onEmployeeUpdated={fetchEmployee}></UpdateEmployee>
       <DeleteEmployee onEmployeeDelete={fetchEmployee}/>
       <GetByIdEmployee></GetByIdEmployee>
       <GetAllEmployee  employees={employees}/>

   </>
  )
}

export default App
