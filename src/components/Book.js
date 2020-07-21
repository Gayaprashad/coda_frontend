import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
export class Book extends Component {
    constructor(props){
        super(props);
        this.state={
            CarsData:[],
            activeItem:{
                "id": null,
                "reg_no": null,
                "location": null,
                "model": null,
                "brand": null,
                "from_date": null,
                "to_date": null,
                "userId": 2,
                "booked": false
            }
        }
        this.fetchCars=this.fetchCars.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    };

    UNSAFE_componentWillMount(){
        this.fetchCars()
    }

    fetchCars(){
        console.log('Fetching...')

        fetch('http://127.0.0.1:8000/api/cars-list')
        .then(response=> response.json())
        .then(data =>
            this.setState({
                CarsData:data
            }))
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleSubmit(e){
        // e.preventDefault();
        console.log("submitting");
        const query = new URLSearchParams(this.props.location.search);
        const carId = query.get('carId')
        const carRegno = query.get('carRegno')
        const carLoc = query.get('carLoc')
        const carMod = query.get('carMod')
        const carBrand = query.get('carBrand')
        const from_date = query.get('from_date')
        const to_date = query.get('to_date')
        const userId = query.get('userId')
        console.log(from_date)
        const temp= {
            "id": carId,
            "reg_no": carRegno,
            "location": carLoc,
            "model": carMod,
            "brand": carBrand,
            "from_date": from_date,
            "to_date": to_date,
            "userId": userId,
            "booked": true
        }
        console.log(temp)
        var csrftoken = this.getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/cars-update/${carId}`
        fetch(url, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              'X-CSRFToken' : csrftoken,
            },
            body:JSON.stringify(temp)
          }).then((reponse)=>{
            this.fetchCars()
          }).catch(function(error){
            console.log('ERROR:',error)
          })
    }

    render() {
        var carData = this.state.CarsData
        var self= this
        return (
            <div className="container">
                <Table>
                    <thead>
                        <th>Registration Number</th>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Location</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Book</th>
                    </thead>
                    <tbody>
                        
                        {carData.map(function(car){
                            if(!car.booked){   
                                return(
                                    <div>
                                        <tr>
                                            <div>
                                                <form onSubmit={self.handleSubmit} ClassName="form">
                                                <input type="hidden" id="carId" name="carId" value={car.id}></input>
                                                <td>
                                                    <input type="hidden" id="carRegno" name="carRegno" value={car.reg_no}></input>
                                                    {car.reg_no}
                                                </td>
                                                <td>
                                                    <input type="hidden" id="carLoc" name="carLoc" value={car.location}></input>
                                                    {car.location}
                                                </td>
                                                <td>
                                                    <input type="hidden" id="carMod" name="carMod" value={car.model}></input>
                                                    {car.model}
                                                </td>
                                                <td>
                                                    <input type="hidden" id="carBrand" name="carBrand" value={car.brand}></input>
                                                    {car.brand}
                                                </td>
                                                <td> <input type="date" id="from_date" name="from_date" value={car.from_date}></input></td>
                                                <td> <input type="date" id="to_date" name="to_date" value={car.to_date}></input></td>
                                                <input type="hidden" id="userId" name="userId" value="2"></input>
                                                <td><input type="submit" name="submit" value="submit"></input></td>
                                            </form>
                                            </div>
                                        </tr>
                                    </div>
                                )
                                
                            }
                        })}
                        
                    </tbody>
                    </Table>
            </div>
        )
    }
}

export default Book
