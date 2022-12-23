import React, { useState } from 'react'
import axios from 'axios'

const Customer = () => {
    ////////////////////////////// variables ////////////////////////////////////////
    const [Name, setName] = useState("")
    const [City, setCity] = useState("")
    const [Age, setAge] = useState(0)
    const [data, setdata] = useState([])
    const [Search, setSearch] = useState("")
    const [wrapper, setwrapper] = useState("")
    ////////////////////////////// Submit Cancel refresh ///////////////////////////
    const handleSubmit = event => {
        event.preventDefault();
        setwrapper()

        const alert = (message, type) => {
            setwrapper([`
                <div class="alert alert-${type} alert-dismissible" role="alert">
                   <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            ])
   
        } 
                if (Name.length < 2) {
                alert("Name must be more than 2 letters", "danger")
            } else {if (City.length < 2) {
                alert("City must be more than 2 letters","danger")
            } else {if (Age < 2) {
                alert("Age must be more than 2 ","danger")
            } else {
                add()
                alert("The book has been successfully added","success")
            }
                
            }
                
            }
        }
    ///////////////////////////////  CRUD CUSTOMERS  ///////////////////////////////
    const MY_SERVER = 'https://book-server-16mz.onrender.com'
    /////////////////////////////////// read //////////////////////////////////////
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Customers').then((res) => setdata(res.data))
    }
    /////////////////////////////////// Search by name ///////////////////////////////////  
    const Search_customer = async (name) => {
        await axios.get(MY_SERVER + '/Customers').then((res) => setdata(res.data.filter(x=>x.Name.includes(name))))
    }
    //////////////////////////////////// create //////////////////////////////////
    const add = async () => {
        await axios.post(MY_SERVER + '/Customers/add', { Name, City, Age })
            .then((res) => console.log(res.data))
        await show_all()
        console.log(Name)
        console.log(City)
        console.log(Age)
    }
    //////////////////////////////// delete //////////////////////////////////////
    const del_item = async (id) => {
        await axios.delete(MY_SERVER + '/Customers/change/' + id).then(console.log('del'))
        await show_all()
    }
    ////////////////////////////////// update ////////////////////////////////////
    const upd=async(id)=>{
        await axios.put(MY_SERVER+'/Customers/change/'+id,{ Name, City, Age })
        await show_all()
    }
    //////////////////////////////// built a display //////////////////////////////////////
    return (
        <div style={{ margin: '5%' }}>
            <div className="input-group mb-1" style={{paddingRight:'55%'}}>
            <span className="input-group-text">Search</span>
            <input type="text" className="form-control" placeholder="Enter a Customer name" onChange={(e)=>setSearch(e.target.value)} value={Search}></input>
            </div>
            <button className="btn btn-secondary" style={{margin:'1%'}} onClick={()=>Search_customer(Search)}>Find customer by name</button>
           
            <h5>Add a new Customer</h5>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                    <input type="text" maxLength={35} className="form-control" placeholder="Enter a name" onChange={(e) => setName(e.target.value)} value={Name} ></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">City</span>
                    <input type="text" minLength={2} maxLength={35} className="form-control" placeholder="Enter a city" onChange={(e) => setCity(e.target.value)} value={City}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Age</span>
                    <input type="number" maxLength={3} max={120} className="form-control" placeholder="Enter age" onChange={(e) => setAge(e.target.value)} value={Age}></input>
                </div>
                <div dangerouslySetInnerHTML={{ __html: wrapper }}></div>
                <button className="btn btn-success" type='submit'>Add Coustomers</button>
                <button style={{margin:'2%'}} className="btn btn-warning" onClick={show_all} type={'button'}>Show Coustomers</button>
            </form>
            <br></br>
            {/* //////////////////////////////Click button to display the information about each object in the list////////////////////////////////////////////// */}
            {data.map((pr, i) =>
                <div key={i} className="accordion accordion-flush">
                    <div className="accordion-item" style={{ backgroundColor: "bisque" }}>
                        <h2 className="accordion-header">
                            <button key={i} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + i}>
                                {pr.Name}
                            </button>
                        </h2>
                        <div id={"flush-collapse" + i} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                City: {pr.City} <br></br>
                                Age: {pr.Age} <br></br>
                                <button className="btn btn-success" onClick={() => upd(pr.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => del_item(pr.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>)
                }


        </div>
    )
}

export default Customer