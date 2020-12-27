import React, { Component } from 'react';
import Header from './header';
import Footer from './footercomp';
//import logo from '../logo.svg';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import User from './User';
import Manager from './Manager';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { fetchManagers, fetchRestaurant, logout } from '../redux/ActionCreators';
import Login from './Login';
import Register from './Register';
import User_register from './user_register';
import Add_res from './Addres';


const mapStateToProps = state=>{
    
    return{
      register: state.registeration,
      login: state.login,
     
    };
  }
  const mapDispatchToProps = dispatch => ({
    resetregisterform: () => {dispatch(actions.reset('register'))},
    resetuserform: () => {dispatch(actions.reset('userregister'))},
    resetrestaurantform: () => {dispatch(actions.reset('restaurant'))},
    logout: ()=>{dispatch(logout())}
  });
  
class Main extends Component {
   
    render(){
       // renders();
        
            console.log(this.props.login)
            return(
                
                <div>
                   
                <Header logout={this.props.logout} login={this.props.login}/>
               
                   
                    <Switch location={this.props.location}>
                        
                        <Route exact path="/login" component={()=><Login login={this.props.login} />}/> 
                        <Route exact path="/register" component={()=><Register  resetregisterform={this.props.resetregisterform} insert={this.props.register.minsert}/>}/>
                        <Route exact path="/uregister" component={()=><User_register  resetuserform={this.props.resetuserform} insert={this.props.register.uinsert}/>}/>
                        {this.props.login.loggedIn?
                        <> 
                        {
                            this.props.login.user === "Manager"?
                            <>
                            {//this is routes for managers
                            }
                        
                                <Route path="/manager" component={()=><Manager login={this.props.login} />}/> 
                                <Route path="/addres" component={()=> <Add_res  login={this.props.login} resetform={this.props.resetrestaurantform}/>}/>
                               
                            
                            </>
                            :
                            <>
                            {//this is routes for users
                            }
                                <Route path="/user" component={()=> <User  login={this.props.login}/>}/>
                            </>
                        }
                            
                            
                           
                        </>
                        :<>
                           <Redirect to="/login"/>
                        </>
                        }
                        
                       
                        <Redirect to="/login"/>
                    </Switch>
                <Footer/>
                
                </div>
            )
           
    }
         
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));