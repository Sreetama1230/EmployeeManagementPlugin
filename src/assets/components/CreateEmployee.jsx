import {useState} from "react"

function CreateEmployee({onEmployeeAdded}){

    const[employee , setEmployee] = useState(
        {
            name:"",
            designation:""
        }
    );

    const handleChange = (event)=>{
        const {name , value} = event.target;
        setEmployee(
            {
                ...employee,
                [name] : value
            }
        );
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();

        try{
            const resp = await
                fetch("http://localhost:8080/employee",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(employee)
                });
            if(!resp.ok){
                throw new Error("Failed to create employee");
            }

            const data = await resp.json();
            console.log("Employee created: ", data)
            onEmployeeAdded();
            alert("Employee created successfully")

            setEmployee({
                name:"",
                designation:""
            });

        }catch (error){
            console.log(error)
            alert("Failed to create")
        }
    };
    return(
        <div>
        <h2>Add Employee Record</h2>
            <form onSubmit={handleSubmit}>
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
                <button type={"submit"}>Add</button>
            </form>
        </div>
    )
}

export default CreateEmployee