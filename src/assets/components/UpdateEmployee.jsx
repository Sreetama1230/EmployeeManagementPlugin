import {useState} from "react"

function UpdateEmployee({onEmployeeUpdated}){

    const[employee , setEmployee] = useState(
        {
            name:"",
            designation:""
        }
    );

    const[id , setId] = useState(0)

    const handleChange = (event)=>{
        const {name , value} = event.target;
        setEmployee(
            {
                ...employee,
                [name] : value
            }
        );
    };

    const handleChangeOfId = (event)=>{
        const  providedId = event.target.value;
        setId(providedId)
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const resp = await
                fetch(`http://localhost:8080/employee/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(employee)
                });
            if(!resp.ok){
                throw new Error("Failed to update employee");
            }

            const data = await resp.json();
            console.log("Employee updated: ", data)
            onEmployeeUpdated();
            alert("Employee updated successfully")

            setEmployee({
                name:"",
                designation:""
            });
            setId(0)

        }catch (error){
            console.log(error)
            alert("Failed to update")
        }
    };
    return(
        <div>
            <h2>Update Employee Record</h2>

            <form onSubmit={handleSubmit}>
               <div>
                   <label>Id</label>
                   <input type={"number"} name={"name"} value={id} onChange={handleChangeOfId}  required={true}>

                   </input>
               </div>
                <div>
                    <label> Name </label>
                    <input
                        type={"text"} name={"name"} value={employee.name}
                        onChange={handleChange}>
                    </input>
                </div>
                <div>
                    <label> Designation </label>
                    <input
                        type={"text"} name={"designation"}
                        value={employee.designation} onChange={handleChange}>
                    </input>
                </div>
                <button type={"submit"}>Update</button>
            </form>
        </div>
    )
}

export default UpdateEmployee