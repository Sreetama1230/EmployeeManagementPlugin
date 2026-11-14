import {useState} from "react"
function GetByIdEmployee(){

    const [id , setId] = useState(0)
    const [employee , setEmployee] = useState(null)
    const handleChange =(event)=>{
        setId(event.target.value)
    }
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const resp = await fetch(`http://localhost:8080/employee/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            if(!resp.ok){
                throw new Error("Failed to fetch employee")
            }
            const data = await  resp.json()
            setEmployee(data)
            alert("Employee fetched successfully...")
            setId(0)

        }catch (error){
            console.error(error)
            alert("Failed to fetch employee ")
        }
    }
    return(
        <div>
            <h2>Fetch Employee By Id</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id</label>
                    <input type={"number"} name={"id"} value={id} onChange={handleChange} required={true}>
                    </input>
                </div>
                <button type={"submit"}>Fetch</button>
            </form>
            <h3>Employee Data</h3>
            { employee && (
                <div key={employee.id}>
                    <h3>ID: {employee.id}</h3>
                    <h3>Name: {employee.name}</h3>
                    <h3>Designation: {employee.designation}</h3>
                </div>
                )

            }
        </div>
    )
}

export  default GetByIdEmployee