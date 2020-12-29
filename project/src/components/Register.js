import React , { Component } from 'react';
import { Card, CardText, CardBody, Button, Row,  Label, Col} from 'reactstrap';//CardImg, CardTitle, CardSubtitle, CardHeader,
import { Control, Form, Errors } from 'react-redux-form';//, actions
import { resetsend, sendmanager } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
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


const validEmail = (val) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
};

const mapDispatchToProps = dispatch => ({
    reset: ()=>{dispatch(resetsend())},
   sendmanager: (a)=>{dispatch(sendmanager(a))}
});
class Register extends Component{
        constructor(props){
            super(props);

            
            this.handleSubmit = this.handleSubmit.bind(this);
            
        }

      
        
        
        handleSubmit(values) {
            console.log(values)
            //alert('Current State is: ' + JSON.stringify(values));
            this.props.resetregisterform();
            this.props.sendmanager(values);
        }
        
        render(){
            return(
                
                <ReactCSSTransitionGroup transitionName = "example"
                    transitionAppear = {true} transitionAppearTimeout = {10000}
                    transitionEnter = {true} transitionEnterTimeout={1000} transitionLeave = {true} transitionLeaveTimeout={1000}>
                    <div className="container padd1">
                        
                        
                        <div className="row justify-content-around">
                            <div className="col-8 col-md-8 mx-auto">
                                <Card className="cards2">
                                    <CardBody >
                                    <CardText className="col-12 col-sm-6 mx-auto center "><h3><b><u>SIGN-UP AS A MANAGER</u></b></h3></CardText>
                                    <div className="row row-content">
                                        <div className="col-12 col-md-9 centerleft1">
                                            <Form model="register" onSubmit={(values) => this.handleSubmit(values)}>

                                        

                                            <Row className="form-group">
                                                <Label htmlfor="Manager_Name" md={4}><b>Manager Name </b></Label>
                                                    
                                                    <Col md={8}>
                                                   
                                                    <Control.text model=".Manager_Name" id="Manager_Name" name="Manager_Name"
                                                            placeholder="Manager Name"
                                                            className="form-control "
                                                            validators={{
                                                                required,minLength: minLength(3),maxLength:  maxLength(15)
                                                            }}
                                                            />
                                                            <Errors
                                                            className="text-danger"
                                                            model=".Manager_Name"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required\n',
                                                                minLength: 'Must be greater than 2 characters',
                                                                maxLength: 'must be 15 characters or less'
                                                            }}/>

                                                            </Col>

                                                        
                                                               
                                                </Row>
                                            


                                                <Row className="form-group">
                                                <Label htmlfor="User_Name" md={4}><b>User Name </b></Label>
                                                    
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
                                                        <Label htmlFor="Manager_Email" md={4}><b>Email</b></Label>
                                                        <Col md={8}>
                                                            <Control.text model=".Manager_Email" id="Manager_Email" name="Manager_Email"
                                                                placeholder="Email"
                                                                className="form-control"
                                                                validators={{
                                                                    required,validEmail
                                                                }}
                                                            />
                                                            <Errors
                                                                    className="text-danger"
                                                                    model=".Manager_Email"
                                                                    show="touched"
                                                                    messages={{
                                                                        required: 'Required \n',
                                                                        validEmail: 'Invalid Email address'
                                                                    
                                                                }}/>
                                                                
                                                        </Col>
                                                        <div className="mx-auto text-danger">
                                                                {!this.props.email? 
                                                                        <>
                                                                            <div>
                                                                                Not a valid email
                                                                            </div>

                                                                        </>
                                                                            :<>
                                                                            
                                                                            </>
                                                                 }
                                                                {console.log(this.props.email, this.props.sent)}
                                                                 {this.props.sent? 
                                                                 
                                                                    <>
                                                                      { alert("an E-mail has been sent to your entered email")}
                                                                        {setTimeout(()=>{
                                                                            this.props.reset()
                                                                        },400) }
                                                                  </>
                                                                    :<>
                                                                        
                                                                    </>
                                                                }

                                                        </div>
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
                                                <Link to="/uregister">
                                                    <button type="button" > Want to register as a user?</button>   
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

export default connect(null,mapDispatchToProps)(Register);
