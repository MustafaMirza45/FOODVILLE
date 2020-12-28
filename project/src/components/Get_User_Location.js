import React, { Component } from 'react';
import Map from './maps/mapuser';
import { Card, CardImg, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, CardBody, CardText ,Button, Media} from 'reactstrap';

class Get_User_Location extends Component{
    constructor() {
        super()
        this.state = {
          location: {
            lat: 0,
            lng: 0,
            Address: null
          },
        }
      }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
              let lat = position.coords.latitude
              let lng = position.coords.longitude
              console.log("getCurrentPosition Success " + lat + lng) // logs position correctly
              this.setState({
                location: {
                  lat: lat,
                  lng: lng
                }
              })
            });
    }
    
    render(){
        if( this.state.location.lat === 0){
          return(
              <div>
                 
              </div>
          )  
        }else
        return(
            <div className="center row-content">
                <Card className="col-6 col-md-6 center ">
                    <Map
                        google={this.props.google}
                        center={{lat: this.state.location.lat, lng:  this.state.location.lng}}
                        height='300px'
                        zoom={15}
                        extractmarker={0}
                    />
                </Card>
               
            </div>
        );
    }
}
export  default Get_User_Location;



