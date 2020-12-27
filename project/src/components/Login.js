import React, { Component } from 'react';
import {Validate_User} from '../redux/ActionCreators';
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
//binding to this
const mapdispatchtoprops = dispatch => ({   //saray calls r returned
    Validate_User : (values) =>    //validate_user ko call krunge to use dispatch
    {
        dispatch (Validate_User(values))   //sending values to the actioncreator wala validate_user
    }  
}) 
const baseUrl='http://localhost:3003/';

class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username : '',
            pass : ''
        };
        this.onSubmit= this.onSubmit.bind(this);
        this.handleUNChange = this.handleUNChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
    }

    onSubmit(event){
        //console.log('Current State is: ' + this.state.username + this.state.pass);
        this.props.Validate_User(this.state);
        
        //console.log('LOGINNN' + this.props.Login_State)
        event.preventDefault();
        
        
        
        
    }

    handleUNChange(event){
        this.setState({
            username : event.target.value
        })
    }

    handlePChange(event){
        this.setState({
            pass : event.target.value
        })
    }

    render() {
        if(this.props.login.loggedIn){
            return(
                <div >
                    {this.props.login.user === "Manager"
                      ?   <Redirect to="/manager"/>
                      :  <Redirect to="/user"/>  }
                </div>  
            )
           
        }else{
            return (
                <div className = 'Grid2 '>
                    <div className="col1">
                        <img src={baseUrl +"images/login_img.jpg"} style={{width: '100%',height: '100%'}}/>
                    </div>
                    <div className= 'col2  '>
                        <div>
                        <img src={baseUrl +'images/logo.jpg'} alt="logo" align = 'left' style={{width:150}}></img>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <label><b>Username</b></label>
    
                            <input 
                            type="text" 
                            placeholder="Enter Username"  
                            value = {this.state.username} 
                            onChange = {this.handleUNChange}
                            />
    
                            <label><b>Password</b></label>
    
                            <input 
                            type="password" 
                            placeholder="Enter Password"
                            value = {this.state.pass} 
                            onChange = {this.handlePChange}
                            />
                            {this.props.login.error? <div>Username or Password is incorrect</div>:<> </>}
                            <button 
                            type="submit">Login</button>
                           
    
                            <label>
                                <input type="checkbox"/> Remember me
                            </label>
    
                            <p></p>
                            <label> Don't have an account?</label>
                            <Link to="/register">
                            <button type="button" >Register</button>   
                            </Link>
                            
                            {/* //link /register  */}
                            
                        </form>
                    </div>
    
                </div>
                
            )
        }
       
    }
}



export default connect (null,mapdispatchtoprops)(Login) 

//connect connects to store (state , dispatch-actions)
