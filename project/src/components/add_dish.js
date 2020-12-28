/*eslint-disable*/
import React , { Component } from 'react';
import { Button, Row,  Label, Col, Modal,ModalBody,ModalHeader,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import Map from './maps/maps';
import { senddish } from '../redux/ActionCreators';
import { connect } from 'react-redux';



var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => {if(val>0){
    return  val && (val.length >= len);
}else{
    return true;
}

};
const isNumber = (val) => !isNaN(Number(val));

  const mapDispatchToProps = dispatch => ({
    senddish: (x,a)=>{dispatch(senddish(x,a))}
  });
function coord_to_meter (lat1,lon1,lat2,lon2){
    	
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d
}
class Add_dish extends Component{
        constructor(props){
            super(props);
            this.state={
              
                ismodalopen: false
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            
        }
        toggleModal(){
            this.setState({
                ismodalopen: !this.state.ismodalopen
    
            });
        }

      
        
        
        handleSubmit(values) {
           
            //alert(coord_to_meter(24.9394957,67.0509869,val.lat,val.lng))
            console.log('Current State is: ' + JSON.stringify(values));
            //alert('Current State is: ' + JSON.stringify(val));
            this.props.resetform();
            this.props.senddish(values,this.props.id);
            this.props.toggle();
            
        }
        render(){
            return(
                
                <ReactCSSTransitionGroup transitionName = "example"
                    transitionAppear = {true} transitionAppearTimeout = {10000}
                    transitionEnter = {true} transitionEnterTimeout={1000} transitionLeave = {true} transitionLeaveTimeout={1000}>
                    <div className="container padd1">
                        <div className="row justify-content-around">
                            <div className="col-11 col-md-10 mx-auto">
                                
                                    <div className="mx-auto center "><h3><b><u>Dish Details</u></b></h3></div>
                                    <div className="row row-content">
                                        <div className="col-11 col-md-10 centerleft1">
                                            <Form model="dish" onSubmit={(values) => this.handleSubmit(values)}>

                                        

                                            <Row className="form-group">
                                                <Label htmlFor="Dish_name" md={4}><b>Dish Name </b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Dish_name" id="Dish_name" name="Dish_name"
                                                            placeholder="Dish Name"
                                                            className="form-control "
                                                            validators={{
                                                                required
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Dish_name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>
                                                            

                                                <Row className="form-group">
                                                    <Label htmlFor="Price" md={4}><b>Price</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Price" id="Price" name="Price"
                                                                placeholder="Price"
                                                                className="form-control"
                                                                validators={{
                                                                    required
                                                                }}
                                                                />
                                                                <Errors
                                                                    className="text-danger"
                                                                    model=".Price"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required\n',
                                                            
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>

                                                <Row className="form-group">
                                                        <Label htmlFor="Serving" md={4}><b>Serving</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Serving" id="Serving" name="Serving"
                                                                placeholder="Serving"
                                                                className="form-control"
                                                                validators={{
                                                                    required
                                                                }}
                                                            />
                                                            <Errors
                                                                    className="text-danger"
                                                                    model=".Serving"
                                                                    show="touched"
                                                                    messages={{
                                                                    required: 'Required\n',
                                                                   
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>
                                                
                                                
                                               

                                                <Row className="form-group">
                                                    <Col md={{size: 10, offset: 6}}>
                                                        <Button type="submit" color="primary">
                                                            <b>Press to Add</b>
                                                            
                                                        </Button>
                                                    </Col>



                                                </Row>
                                                  
                                                


                                                
                                                
                                            </Form>     
                                        </div>
                                        

                                    </div>
                            
                            </div>
                        </div>  
                        
                    </div>
                </ReactCSSTransitionGroup>
               
            );
       }
            
    
    }

export default connect(null,mapDispatchToProps) (Add_dish);
