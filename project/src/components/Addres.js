import React, { Component } from 'react';

import { Card, CardImg, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, CardBody, CardText ,Button, Media} from 'reactstrap';
import Add_restaurant from './add_restaurant';

class Add_res extends Component{
    constructor() {
        super()
        this.state = {
          location: {
            lat: 0,
            lng: 0
          }
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
            <div className="row row-content">
                 {console.log("sadasdsaadsa"+this.state.location)}
                <Card className="col-7 col-md-7 center mx-auto">
                    <Add_restaurant location={this.state.location} resetform={this.props.resetform} login={this.props.login}/>
                </Card>
               
            </div>
        );
    }
}
export  default Add_res;



