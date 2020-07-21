import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

export class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            DBData:[]
        }
    };

    UNSAFE_componentWillMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        console.log('Fetching...')
        fetch('http://127.0.0.1:8000/api/dashboard')
        .then(response =>response.json())
        .then(data =>
            this.setState({
                DBData:data
            }))
    }
    render() {
        var DBData= this.state.DBData
        return (
                <div>
                {/* {DBData.map(function(data){
                    return(
                        <div>
                        <h2>Availability</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>On road</th>
                                <th>Available</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>200</td>
                                <td>300</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h2>Most demanded</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>By Location</th>
                                <th>By Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Villivakkam </td>
                                <td>Sedan </td>
                            </tr>
                            </tbody>
                        </Table>
                        </div>
                    )
                })
                } */}
                <div>
                        <h2>Availability</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>On road</th>
                                <th>Available</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{DBData.onroad}</td>
                                <td>{DBData.available}</td>
                            </tr>
                            </tbody>
                        </Table>
                        <h2>Most demanded</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>By Location</th>
                                <th>By Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{DBData.mostInDemandLoc} </td>
                                <td>{DBData.mostInDemandMod} </td>
                            </tr>
                            </tbody>
                        </Table>
                        </div>
                </div>
        )
    }
}

export default Dashboard
