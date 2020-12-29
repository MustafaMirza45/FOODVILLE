import React, { Component } from 'react';
import Header from './header';
import Footer from './footercomp';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Manager from './Manager';
import User from './Get_User_Location';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { logout,resetsend } from '../redux/ActionCreators';
import Login from './Login';
import Register from './Register';
import User_register from './user_register';
import User_profile from './User_profile';
import Add_res from './Addres';
import Man_res from './Man_res';
import Update_restaurant from './update_restaurant';
import Update_dish from './Update_dish';
import Get_User_Location from './Get_User_Location';
import User_RestaurantView from './User_RestaurantView'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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
    resetdishform: () => {dispatch(actions.reset('dish'))},
    logout: ()=>{dispatch(logout())},
    reset: ()=>{dispatch(resetsend())}
  });
  
class Main extends Component {
   componentDidMount(){
     this.props.reset()
   }
    render(){
       // renders();
       const restWithId= ({match}) =>{
        console.log(match.params.resID)
        return(
          <div>
            <User_RestaurantView resID = {match.params.resID} UserID ={this.props.login.Id}/>
          </div>
        )
      }
       const Reswithid =({match})=>{
       
        console.log(match.params.resid);
        return(
            <Man_res id={match.params.resid}  login={this.props.login}  resetform={this.props.resetdishform}/>
        );
        
      }

      const Resupdid =({match})=>{
       
        console.log(match.params.resid);
        return(
            <Update_restaurant id={match.params.resid}  login={this.props.login} resetform={this.props.resetrestaurantform}/>
        );
        
      }
      const dishwithid =({match})=>{
       
        console.log(match.params.resid);
        return(
            <Update_dish id={match.params.resid}  login={this.props.login} resetform={this.props.resetdishform}/>
        );
        
      }
            console.log(this.props.login)
            return(
                
                <div>
                   
                <Header logout={this.props.logout} login={this.props.login}/>
                <ReactCSSTransitionGroup transitionName = "example"
                transitionAppear = {true} transitionAppearTimeout = {10000}
                transitionEnter = {true} transitionEnterTimeout={1000} transitionLeave = {true} transitionLeaveTimeout={1000}>
                   
                    <Switch location={this.props.location}>
                        
                        <Route exact path="/login" component={()=><Login login={this.props.login} />}/> 
                        <Route exact path="/register" component={()=><Register  resetregisterform={this.props.resetregisterform} insert={this.props.register.minsert} email={this.props.register.memail} sent={this.props.register.sent}/>}/>
                        <Route exact path="/uregister" component={()=><User_register  resetuserform={this.props.resetuserform} insert={this.props.register.uinsert} email={this.props.register.uemail} sent={this.props.register.sent}/>}/>
                        {this.props.login.loggedIn?
                        <> 
                        {
                            this.props.login.user === "Manager"?
                            <>
                            {//this is routes for managers
                            }
                        
                                <Route exact path="/manager" component={()=><Manager login={this.props.login} />}/> 
                                <Route path="/addres" component={()=> <Add_res  login={this.props.login} resetform={this.props.resetrestaurantform}/>}/>
                                <Route path="/manager/:resid" component={Reswithid}/> 
                                <Route path="/update/:resid" component={Resupdid}/> 
                                <Route path="/dish/:resid" component={dishwithid}/> 
                            
                            </>
                            :
                            <>
                            {//this is routes for users
                            }
                            <Route exact path="/user" component={()=> <User_profile  login={this.props.login}/>}/>
                            <Route path="/getlocation" component={()=> <Get_User_Location/>}/>
                            <Route path="/user/:resID" component={restWithId}/>
                            </>
                        }
                            
                            
                           
                        </>
                        :<>
                           <Redirect to="/login"/>
                        </>
                        }
                        
                       
                        <Redirect to="/login"/>
                    </Switch>
                    </ReactCSSTransitionGroup>
                <Footer/>
                
                </div>
            )
           
    }
         
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));