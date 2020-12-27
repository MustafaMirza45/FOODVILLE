/*eslint-disable*/
import React , { Component } from 'react';
import { Button, Row,  Label, Col, Modal,ModalBody,ModalHeader,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import Map from './maps/maps';
import { sendres } from '../redux/ActionCreators';
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

const mapStateToProps = state=>{
    
    return{
        res:state.restaurants
    };
  }
  const mapDispatchToProps = dispatch => ({
    sendres: (x)=>{dispatch(sendres(x))}
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
class Add_restaurant extends Component{
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
            let val= {
                Rest_Name: values.Rest_Name,
                Cuisine_Type: values.Cuisine_Type,
                Website: values.Website,
                Address: values.Address,
                Contact_no: values.Contact_no,
                lat: this.props.res.location[0].lat,
                lng: this.props.res.location[0].lng,
                Manager_ID: this.props.login.Id


            }
            //alert(coord_to_meter(24.9394957,67.0509869,val.lat,val.lng))
            console.log('Current State is: ' + JSON.stringify(val));
            //alert('Current State is: ' + JSON.stringify(val));
            this.props.resetform();
            this.props.sendres(val);
            
        }
        render(){
            return(
                
                <ReactCSSTransitionGroup transitionName = "example"
                    transitionAppear = {true} transitionAppearTimeout = {10000}
                    transitionEnter = {true} transitionEnterTimeout={1000} transitionLeave = {true} transitionLeaveTimeout={1000}>
                    <div className="container padd1">
                        <div className="row">
                            <Breadcrumb className="navr">
                                    <BreadcrumbItem><Link to="/manager">Profile</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Add Restaurant</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="row justify-content-around">
                            <div className="col-8 col-md-8 mx-auto">
                                
                                    <div className="mx-auto center "><h3><b><u>ADD YOUR RESTAURANT</u></b></h3></div>
                                    <div className="row row-content">
                                        <div className="col-12 col-md-9 centerleft1">
                                            <Form model="restaurant" onSubmit={(values) => this.handleSubmit(values)}>

                                        

                                            <Row className="form-group">
                                                <Label htmlFor="Rest_Name" md={4}><b>Restaurant Name </b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Rest_Name" id="Rest_Name" name="Rest_Name"
                                                            placeholder="Restaurant Name"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(5),maxLength:  maxLength(50)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Rest_Name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 5 characters',
                                                                maxLength: 'must be 50 characters or less'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>
                                                            
                                                
                                                <Row className="form-group">
                                                    <Col md={{size: 3, offset:0}}>
                                                        
                                                            <Label>                                                         
                                                               <b>Cuisine Type:</b>
                                                            </Label>
                                                      
                                                    </Col>
                                                    <Col md={{size: 7, offset: 1}}>
                                                        <Control.select model=".Cuisine_Type" name="Cuisine_Type"
                                                            className="form-control">
                                                            <option>Desi</option>
                                                            <option>Western</option>
                                                            <option>Mexican</option>
                                                            <option>Italian</option>
                                                            <option>Chinese</option>
                                                            
                                                            
                                                        </Control.select>
                                                    </Col>
                                                </Row>




                                                <Row className="form-group">
                                                    <Label htmlFor="Website" md={4}><b>Website (If any)</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Website" id="Website" name="Website"
                                                                placeholder="Website"
                                                                className="form-control"
                                                                validators={{
                                                                    required,minLength: minLength(3)
                                                                }}
                                                                />
                                                                <Errors
                                                                    className="text-danger"
                                                                    model=".Website"
                                                                    show="touched"
                                                                    messages={{
                                                                        minLength: 'Must be greater than 3 numbers',
                                                                        
                                                                        
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>

                                               

                                         

                                                <Row className="form-group">
                                                    <Label htmlFor="Contact_no" md={4}><b>Contact Number</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Contact_no" id="Contact_no" name="Contact_no"
                                                                placeholder="Cont. Number"
                                                                className="form-control"
                                                                validators={{
                                                                    required,minLength: minLength(13),maxLength:  maxLength(20), isNumber
                                                                }}
                                                                />
                                                                <Errors
                                                                    className="text-danger"
                                                                    model=".Contact_no"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required\n',
                                                                        minLength: 'Must be 13 digits',
                                                                        maxLength: 'Must be 13 fixed'
                                                            
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>

                                                <Row className="form-group">
                                                        <Label htmlFor="Address" md={4}><b>Address</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Address" id="Address" name="Address"
                                                                placeholder="Address"
                                                                className="form-control"
                                                                validators={{
                                                                    required,minLength: minLength(10),maxLength:  maxLength(50)
                                                                }}
                                                            />
                                                            <Errors
                                                                    className="text-danger"
                                                                    model=".Address"
                                                                    show="touched"
                                                                    messages={{
                                                                    required: 'Required\n',
                                                                    minLength: 'Must be 10 digits',
                                                                    maxLength: 'Must be 50 fixed'
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>
                                                
                                                <Row className="form-group">
                                                        <Col md={{size: 8, offset: 4}}>
                                                        <Button outline onClick={this.toggleModal}><span className="fa fa-location-arrow"></span>Enter Location</Button>
                                                                                                    
                                                    <Modal className=" tfont shadows " isOpen={this.state.ismodalopen} toggle={this.toggleModal}>
                                                      
                                                        <ModalBody className=" shadows">
                                                        <Button outline onClick={this.toggleModal}><span className="fa fa-save"></span> Done</Button>
                                                        <Map
                                                            google={this.props.google}
                                                            center={{ lat: this.props.location.lat, lng:  this.props.location.lng}}
                                                            height='300px'
                                                            zoom={15}
                                                            lat={this.props.location.lat}
                                                            lng={ this.props.location.lng}
                                                            
                                                        />
                                                        </ModalBody>
                                                       
                                                    </Modal>
                                                        {console.log("sadsad",this.props.location.lat,this.props.location.lng)}
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

export default connect(mapStateToProps,mapDispatchToProps) (Add_restaurant);
