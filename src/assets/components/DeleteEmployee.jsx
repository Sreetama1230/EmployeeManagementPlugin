import {useState} from "react"
function DeleteEmployee({onEmployeeDelete}){

const [id , setId] = useState(0)

    const handleChange =(event)=>{
        setId(event.target.value)
    }
    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const resp = await fetch(`http://localhost:8080/employee/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            if(!resp.ok){
                throw new Error("Failed to delete employee")
            }

            alert("Employee deleted successfully...")
            onEmployeeDelete();
            setId(0)

        }catch (error){
            console.error(error)
            alert("Failed to delete employee ")
        }
    }
    return(
        <div>
            <h2>Delete Employee By Id</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Id</label>
                    <input type={"number"} name={"id"} value={id} onChange={handleChange} required={true}>
                    </input>
                </div>
                <button type={"submit"}>Delete</button>
            </form>
        </div>
    )
}

export  default DeleteEmployee