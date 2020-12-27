import React , { Component } from 'react';
import { Card, CardText, CardBody, Button, Row,  Label, Col} from 'reactstrap';//CardImg, CardTitle, CardSubtitle, CardHeader,
import { Control, Form, Errors } from 'react-redux-form';//, actions
import { senduser } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { FadeTransform } from 'react-animation-components';

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

const username =(insert)=>(val)=> insert;

const validEmail = (val) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
};




const mapDispatchToProps = dispatch => ({
    senduser: (a)=>{dispatch(senduser(a))}
 });

class User_register extends Component{
        constructor(props){
            super(props);

            
            this.handleSubmit = this.handleSubmit.bind(this);
            
            
        }

      
        
        
        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            this.props.resetuserform();
            this.props.senduser(values);
        }
        
        render(){
            console.log(this.props.insert);
            return(
                
                <ReactCSSTransitionGroup transitionName = "example"
                    transitionAppear = {true} transitionAppearTimeout = {0}
                    transitionEnter = {true} transitionEnterTimeout={0} transitionLeave = {true} transitionLeaveTimeout={0}>
                    <div className="container padd1">
                        
                        
                        <div className="row justify-content-around">
                            <div className="col-8 col-md-8 mx-auto">
                                <Card className="cards2">
                                    <CardBody >
                                    <CardText className="col-12 col-sm-6 mx-auto center "><h3><b><u>SIGN-UP AS A USER</u></b></h3></CardText>
                                    <div className="row row-content">
                                        <div className="col-12 col-md-9 centerleft1">
                                            <Form model="userregister" onSubmit={(values) => this.handleSubmit(values)}>

                                        

                                            <Row className="form-group">
                                                <Label htmlfor="first_name" md={4}><b>First Name </b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".first_name" id="first_name" name="first_name"
                                                            placeholder="First Name"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(3),maxLength:  maxLength(15)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".first_name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 2 characters',
                                                                maxLength: 'must be 15 characters or less'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>
                                            


                                                <Row className="form-group">
                                                <Label htmlfor="Last_name" md={4}><b>Last Name</b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Last_name" id="Last_name" name="Last_name"
                                                            placeholder="Last Name"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(3),maxLength:  maxLength(15)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Last_name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 2 characters',
                                                                maxLength: 'must be 15 characters or less'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>           
                                                



                                                <Row className="form-group">
                                                <Label htmlfor="Phone_num" md={4}><b>Phone Number</b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Phone_num" id="Phone_num" name="Phone_num"
                                                            placeholder="Phone Number"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(11),maxLength:  maxLength(20),isNumber
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Phone_num"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 10 digits',
                                                                maxLength: 'must be 13 digits or less',
                                                                isNumber: 'Must be a number'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>              



                                                <Row className="form-group">
                                                        <Label htmlFor="Email" md={4}><b>Email</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Email" id="Email" name="Email"
                                                                placeholder="Email"
                                                                className="form-control"
                                                                validators={{
                                                                    required,validEmail
                                                                }}
                                                            />
                                                            <Errors
                                                                    className="text-danger"
                                                                    model=".Email"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required\n',
                                                                        validEmail: 'Invalid Email address'
                                                                    
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>



                                                                
                                                <Row className="form-group">
                                                <Label htmlfor="User_Name" md={4}><b>User Name</b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".User_Name" id="User_Name" name="User_Name"
                                                            placeholder="User Name"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(3),maxLength:  maxLength(25)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".User_Name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 2 characters',
                                                                maxLength: 'must be 25 characters or less',
                                                            

                                                            }}/>

                                                            </Col>
                                                            <div className="mx-auto text-danger">
                                                                {!this.props.insert? 
                                                                    <div>
                                                                        Username already Exists
                                                                    </div>
                                                                    :<></>
                                                                }
                                                            </div>

                                                        
                                                               
                                                </Row>


                                                <Row className="form-group">
                                                    <Label htmlFor="Password" md={4}><b>Password</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Password" id="Password" name="Password"
                                                                type= "password"
                                                                placeholder="Password"
                                                                className="form-control"
                                                                validators={{
                                                                    required,minLength: minLength(8)
                                                                }}
                                                                />
                                                                <Errors
                                                                    className="text-danger"
                                                                    model=".Password"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required\n',
                                                                        minLength: 'Must be greater than 8 numbers',
                                                                        
                                                                        
                                                                }}/>
                                                                
                                                        </Col>
                                                </Row>









                                                <Row className="form-group">
                                                <Label htmlfor="Home_address" md={4}><b>Home Address</b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Home_address" id="Home_address" name="Home_address"
                                                            placeholder="Home Address"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(3),maxLength:  maxLength(100)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Home_address"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 2 characters',
                                                                maxLength: 'must be 100 characters or less'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>           
           

                                                <Row className="form-group">
                                                <div className="form-check">
                                                    <Label htmlfor="Gender" md={12}><b>Gender</b></Label>
                                                </div>
                                                  
                                                    <Col md={{size: 5  , offset: 1}}>
                                                        <Control.select model=".Gender" name="Gender"
                                                            className="form-control">
                                                            <option>M</option>
                                                            <option>F</option> 
                                                            <option>O</option> 
                                                        </Control.select>
                                                    </Col>
                                                </Row>
                                               



                                                <Row className="form-group">
                                                    <Col md={{size: 10, offset: 6}}>
                                                        <Button type="submit" color="primary">
                                                            <b>Register</b>
                                                            
                                                        </Button>
                                                    </Col>



                                                </Row>

                                                
                                            </Form>     
                                        </div>
                                        <div className="col-5 mx-auto">
                                                <Link to="/register">
                                                    <button type="button" > Want to register as a Manager?</button>   
                                                </Link>
                                                
                                        </div>
                                        

                                    </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>  
                        
                    </div>
                </ReactCSSTransitionGroup>
               
            );
       }
            
       
    
    }

export default connect(null,mapDispatchToProps)(User_register);
