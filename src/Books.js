import React, { useState } from 'react'
import axios from 'axios'
const Books = () => {
    /////////////////////////// variables ///////////////////////////////////////    
    const [Name, setName] = useState("")
    const [Author, setAuthor] = useState("")
    const [Year_Published, setYear_Published] = useState("")
    const [Type, setType] = useState(1)
    const [data, setdata] = useState([])
    const [Search, setSearch] = useState("")
    const [wrapper, setwrapper] = useState("")
    //////////////////////// Submit Cancel refresh ///////////////////////////////////   
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
            } else {if (Author.length < 2) {
                alert("Author must be more than 2 letters","danger")
            } else {if (Year_Published == "") {
                alert("Must choose a date","danger")
            } else {
                add()
                alert("The book has been successfully added","success")
            }
                
            }
                
            }
    }
    ////////////////////// A function that adds days to a date ////////////////////    
    let da = ""
    const addDays = (date) => {
        const result = new Date(date.toString());
        let year = result.getFullYear()
        let day = result.getDate()
        let month = (result.getMonth() + 1)
        da = `${year}/${month}/${day}`
        setYear_Published(da)
        console.log(da)
        console.log(Year_Published)
    }
    ///////////////////////////////  CRUD BOOKS  ///////////////////////////////////////    
    const MY_SERVER = 'https://book-server-16mz.onrender.com'
    //////////////////////////////////// create //////////////////////////////////    
    const add = async () => {
        addDays(Year_Published)
        axios.post(MY_SERVER + '/Books/add', { Name, Author, Year_Published, Type })
            .then((res) => console.log(res.data))
        setYear_Published("")
        show_all()
    }
    ///////////////////////////////////// read /////////////////////////////////    
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Books').then((res) => setdata(res.data))
    }
    /////////////////////////////////// Search by name ///////////////////////////////////    
    const Search_book = async (name) => {
        await axios.get(MY_SERVER + '/Books').then((res) => setdata(res.data.filter(x => x.Name.includes(name))))
    }
    ///////////////////////////////////// update /////////////////////////////////    
    const upd = async (id) => {
        await axios.put(MY_SERVER + '/Book/change/' + id, { Name, Author, Year_Published, Type })
        await show_all()
    }
    ////////////////////////////////// delete ////////////////////////////////////    
    const del_item = async (id) => {
        await axios.delete(MY_SERVER + '/Book/change/' + id).then(console.log('del'))
        await show_all()
    }
    /////////////////////////////////// built a display ///////////////////////////////////    
    return (
        <div style={{ margin: '5%' }} >
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-1" style={{ paddingRight: '55%' }}>
                    <span className="input-group-text">Search</span>
                    <input type="text" className="form-control" placeholder="Enter a book name" onChange={(e) => setSearch(e.target.value)} value={Search}></input>
                </div>
                <button type='button' className="btn btn-secondary" style={{ margin: '1%' }} onClick={() => Search_book(Search)}>find book by name</button>

                <h5>add a new book</h5>
                <div className="input-group mb-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" minLength={2} maxLength={50} className="form-control" placeholder="Enter a book name" onChange={(e) => setName(e.target.value)} value={Name}></input>
                 </div>    
               
                <div className="input-group mb-3">
                    <span className="input-group-text">Author</span>
                    <input type="text" minLength={2} maxLength={35} className="form-control" placeholder="Enter a author name" onChange={(e) => setAuthor(e.target.value)} value={Author}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" >Year Published</span>
                    <input type="date" minLength={2} className="form-control" onChange={event => setYear_Published(event.target.value)} value={Year_Published}></input>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text">Book type</label>
                    <select className="form-select" onChange={event => setType(event.target.value)}>
                        <option value={1}>Horror book-Type one</option>
                        <option value={2}>Action book-Type Two</option>
                        <option value={3}>Adventure book-Type Three</option>
                    </select>
                </div>
                <div dangerouslySetInnerHTML={{ __html: wrapper }}></div>
                <button className="btn btn-success" type='submit' id="liveAlertBtn" >add book</button>
                <button type='button' style={{ margin: '2%' }} className="btn btn-warning" onClick={show_all}>show all books</button>
                
                
            </form>
            {/* //////////////////////////////Click button to display the information about each object in the list////////////////////////////////////////////// */}
            {
                data.map((pr, i) =>
                    <div key={i} className="accordion accordion-flush">
                        <div className="accordion-item" style={{ backgroundColor: "#bisque" }}>
                            <h2 className="accordion-header">
                                <button key={i} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + i}>
                                    {pr.Name}
                                </button>
                            </h2>
                            <div id={"flush-collapse" + i} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    Author: {pr.Author} <br></br>
                                    Year Published: {pr.Year_Published} <br></br>
                                    Type: {pr.Type} <br></br>
                                    <button className="btn btn-success" onClick={() => upd(pr.id)}>update</button>
                                    <button className="btn btn-danger" onClick={() => del_item(pr.id)}>delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Books