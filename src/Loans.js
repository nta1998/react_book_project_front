import React, { useState } from 'react'
import axios from 'axios'

const Loans = () => {
    ////////////////////////////// variables /////////////////////////////////////////
    const [date_Loandate, setdate_Loandate] = useState("")
    const [date_input, setdate_input] = useState("")
    const [data, setdata] = useState([])
    const [view, setview] = useState()
    const [customerid, setcustomerid] = useState(1)
    const [booktype, setbooktype] = useState([])
    const [cos_id, setcos_id] = useState("")
    const [book_id, setbook_id] = useState("")
    const [dayleft, setdayleft] = useState(0)
    const [wrapper, setwrapper] = useState("")
    const alert = (message, type) => {
        setwrapper([`
            <div class="alert alert-${type} alert-dismissible" role="alert">
               <div>${message}</div>
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
       ] )
    }
    ///////////////////////////// Submit Cancel refresh //////////////////////////////
    const handleSubmit = event => {
        event.preventDefault();
        setwrapper()

        if (customerid < 0) {
            alert("Must choose Customer Name", "danger")
        }
        if (dayleft < 0) {
            alert("Must choose Book Name","danger")
        }
        if (date_input == "") {
            alert("Must choose a date","danger")
        }
        else {
            add()
            alert("The book loan has been successfully added","success")
        }
    }
    ///////////////////////// A function that adds days to a date //////////////////    
    let date_Return = ""
    const addDays = (date, days) => {
       

        const result = new Date(String(date));
        result.setDate(result.getDate() + parseInt(days));

        let year = result.getFullYear()
        let day = result.getDate()
        let month = (result.getMonth() + 1)
        date_Return = `${year}/${month}/${day}`
        console.log(date_Return)
        setview(date_Return)


    }
    //////////////////////////////////////////////////////////////////////  
    const format_d = (date) => {
        let da2 = ""
        const result = new Date(date.toString());
        let year = result.getFullYear()
        let day = result.getDate()
        let month = (result.getMonth() + 1)
        da2 = `${year}/${month}/${day}`
        setdate_Loandate(da2)

    }
    //////////////////////////////////////////////////////////////////////  
    const type_2 = (event) => {
        if (event.target.value[0] == 1) {
            setdayleft(10)
        }
        if (event.target.value[0] == 2) {
            setdayleft(5)

        }
        if (event.target.value[0] == 3) {
            setdayleft(2)

        }
        console.log(dayleft)
        setbooktype(event.target.value[2])

    }
    //////////////////////////////////////////////////////////////////////      
    const diff = (date) => {
        var date1 = new Date(date)
        var date2 = new Date()
        var Difference_In_Time = date2.getTime() - date1.getTime()
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
        return Difference_In_Days
    }
    /////////////////////////////  CRUD LOANS  /////////////////////////////////////////  
    const MY_SERVER = 'https://book-server-16mz.onrender.com'
    /////////////////////////////////// read ///////////////////////////////////  
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Loans').then((res) => setdata(res.data))

    }
    //////////////////////////////////////////////////////////////////////  
    const Coustomers_id = () => {
        axios.get(MY_SERVER + '/Customers').then((res) => setcos_id(res.data.map(pr => `<option value=${pr.id} >${pr.Name}</option>`).join("")))
    }
    //////////////////////////////////////////////////////////////////////  
    const Books_id = () => {
        axios.get(MY_SERVER + '/Books').then((res) => setbook_id(res.data.map(book => `<option value=${[book.Type,book.id]} >${book.Name}</option>`).join("")))
    }
    //////////////////////////////////////////////////////////////////////  
    const show_all_active = async () => {
        await axios.get(MY_SERVER + '/Loans').then((res) => setdata(res.data.filter(x => x.returned == 0 )))
    }
    //////////////////////////////////////////////////////////////////////  
    const show_all_late = async () => {
        await axios.get(MY_SERVER + '/Loans').then((res) => setdata(res.data.filter(x => diff(x.Returndate) > 0)))
    }
    //////////////////////////////////// create //////////////////////////////////     
    const add = async () => {
        console.log(dayleft)
        addDays(date_input, dayleft)
        format_d(date_input)
        axios.post(MY_SERVER + '/Loans/add', { 'Loandate': date_input, 'Returndate': date_Return, 'customers_id': customerid, 'BookID': booktype })
   
    }
    ///////////////////////////////////// delete /////////////////////////////////     
    const del_item = async (id) => {
        await axios.delete(MY_SERVER + '/Loans/change/' + id)
        await show_all()
        alert("The loan details have been deleted","danger")
    }
    ////////////////////////////////// update ////////////////////////////////////      
    const upd = async (id) => {
        addDays(date_Loandate, dayleft)

        await axios.put(MY_SERVER + '/Loans/change/' + id, { 'Loandate': date_input, 'Returndate': date_Return, 'customers_id': customerid, 'BookID': booktype })
        alert("The book has been successfully updated", "success")
    }
    //////////////////////////////////////////////////////////////////////      
    const Returning = async (id) => {
        alert("The book has been successfully returned", "success")
        await axios.put(MY_SERVER + '/Loans/returned/' + id, { 'returned': true })
    }
    //////////////////////////////////////////////////////////////////////     
    Coustomers_id()
    Books_id()
    ////////////////////////////////// built a display ////////////////////////////////////         
    return (
        <div style={{ margin: '5%' }}>
            <h5>Add a new Loans</h5>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <label className="input-group-text" >Customer Name</label>
                    <select className="form-select"  onChange={event => setcustomerid(event.target.value)} dangerouslySetInnerHTML={{ __html: cos_id }} >
                    </select>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" >Book Name</label>
                    <select className="form-select"  onChange={event=>type_2(event)} onMouseEnter={event=>type_2(event)} dangerouslySetInnerHTML={{ __html: book_id }}>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Londate</span>
                    <input type="date"  minLength={2} className="form-control" onChange={e => setdate_input(e.target.value)} ></input>
                </div>
                <div dangerouslySetInnerHTML={{ __html: wrapper }}></div>
                <button className="btn btn-success" type='submit'>Add Loans</button>
                <button style={{ margin: '2%' }} className="btn btn-warning" onClick={show_all} type="button">Show all Loans</button>
                <button className="btn btn-danger" onClick={show_all_late} type="button">Display late Loans</button>
                <button style={{ margin: '2%' }} className="btn btn-info" onClick={show_all_active} type="button">Active Loans</button>

            </form>
            <h1>Returndate:{view}</h1>
             {/* //////////////////////////////Click button to display the information about each object in the list////////////////////////////////////////////// */}
            {
                data.map((pr, i) =>
                    <div key={i} className="accordion accordion-flush">
                        <div className="accordion-item" style={{ backgroundColor: "#bisque" }}>
                            <h2 className="accordion-header">
                                <button key={i} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + i}>
                                    {pr.cosName} / {pr.bookName}
                                </button>
                            </h2>
                            <div id={"flush-collapse" + i} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">customer name :{pr.cosName} <br></br>
                                    Book nmae: {pr.bookName} <br></br>Loandate:{pr.Loandate} <br></br>
                                    Returndate:{pr.Returndate}<br></br>
                                    <button className="btn btn-success" onClick={() => upd(pr.id)}>update</button>
                                    <button style={{ margin: '0.3%' }} className="btn btn-secondary" onClick={() => Returning(pr.id)}>Returning a book</button>
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


export default Loans