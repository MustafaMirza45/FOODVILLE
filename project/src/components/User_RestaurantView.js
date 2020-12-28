import React, { Component } from 'react'
import { fetchAllRestaurants, fetchreviews, fetchdishes, checkrev } from '../redux/ActionCreators'
import { Card,CardTitle,CardBody, CardText ,Label} from 'reactstrap';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom';
import {Send_Review} from '../redux/ActionCreators';
const baseUrl='http://localhost:3003/'

const mapDispatchToProps = dispatch => ({   //saray calls r returned
    fetchAllRestaurants: (values)=>
    {
        console.log("Inside mapdispatchtoProps Fetch all rest" + values.Id);
        dispatch(fetchAllRestaurants(values))
    },

    Send_Review: (values)=>
    {
        console.log("review sent" + values.Id);
        dispatch(Send_Review(values))
    },

    fetchreviews: (values)=>
    {
        console.log("Inside mapdispatchtoProps Fetch all reviwes" + values.Id);
        dispatch(fetchreviews(values))
    },

    fetchdishes: (values)=>
    {
        console.log("Inside mapdispatchtoProps Fetch all dishes" + values.Id);
        dispatch(fetchdishes(values))
    },
    checkrev: (m)=>{dispatch(checkrev(m))}
}) 

const mapStateToProps = state=>{
    
    return{
        LoggedInUser : state.loggedinUser,
        restaurant : state.restaurants,
        review : state.review,
        dishes : state.dishes
        
    };
  }
export class User_RestaurantView extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            rating : '',
            comment : '',
            Restaurant_ID : this.props.resID,
            User_ID: this.props.UserID
        };

        this.onSubmit= this.onSubmit.bind(this);
        this.handleRchange = this.handleRchange.bind(this);
        this.handleVchange = this.handleVchange.bind(this);
    }

    onSubmit(event){
        this.props.Send_Review(this.state);
        setTimeout(() => {
            this.props.fetchreviews(this.state);
            this.props.fetchAllRestaurants(this.state);
        }, 500);
        
        event.preventDefault()
    }
    componentDidMount(){

        console.log("BEFORE DISPATCH XXXXXXXXXXXXXXX" +this.state.Id) 
        setTimeout(()=>{
            this.props.checkrev(this.state)
        }, 200)
       
        this.props.fetchAllRestaurants(this.state);
        this.props.fetchreviews(this.state);
        this.props.fetchdishes(this.state);
        }
    
        handleRchange(event) {

            const re = /^[0-5\b]+$/;
        
              if (event.target.value === '' || re.test(event.target.value)) {
        
                 this.setState({rating: event.target.value})
        
              }
        
          }

          
        handleVchange(event) {

            this.setState({
                comment : event.target.value
            })
        
          }


    render() {
        {console.log("STORE HORAHI HAI " + this.state.Restaurant_ID +"  " + this.state.User_ID)}
        const y=[] = this.props.restaurant.restaurants;
        const y2=[] = this.props.review.review;
        const y3=[] = this.props.dishes.dishes;

        let RestonClick= [] =y.filter(
            (y) => {
                if(y.Restaurant_ID == this.state.Restaurant_ID){
                return( y);
            }
            }
        )

        let FilteredReviews= [] =y2.filter(
            (y2) => {
                if(y2.Restaurant_ID == this.state.Restaurant_ID){
                return( y2.Comment);
            }
            }
        )

        let FilteredDishes= [] =y3.filter(
            (y3) => {
                if(y3.Restaurant_ID == this.state.Restaurant_ID){ 
                return( y3.img_src);
            }
            }
        )
                

        const abc = RestonClick.map((res)=>{

            
            return(
                
                <Card className="cards bord row" body  style={{borderColor: '#0000' }}>
                    {console.log("inside abs resonclick  " + res.Rest_Name)}
                 <CardBody>
                    <img className="cut" src={baseUrl + res.img_src}/>   
                    <CardTitle><h1 className="tfont "><b>Restaurant Name: </b>{res.Rest_Name}</h1></CardTitle>

                    <div className="row">
                            <div className=" col-12 col-md-6">
                                <CardText><b className="colort">.. Restaurant Email:  </b>{res.Website}</CardText> 
                            </div>
                            <div className=" col-12 col-md-6">
                                <CardText><b className="colort">. Rating:   </b>{res.Rating}</CardText> 
                            </div>
                            <div className=" col-12 col-md-6">
                                <CardText><b className="colort">. Contact Number:   </b>{res.Contact_no}</CardText> 
                            </div>
                            
                        </div>
                      
                       


                    </CardBody>
                     </Card>
            )
            
            
        })


        const abc2 = FilteredReviews.map((res2)=>{

            
            return(
                <div style= {{backgroundColor:"red"}}>
                    <Card className="cards shadows row reviewfont" body  style={{borderColor: '#0000' }}>
                    <CardBody>
                    <li><p>Review by Mr/Miss. <u>{res2.first_name+" "+ res2.Last_name}</u>:</p>
                        <b>{res2.Comment}</b></li>
                    </CardBody>
                    </Card>
                </div>
            )

            
        })
        


        const abc3 = FilteredDishes.map((res3)=>{

            
            return(
           
                <div>
                    <Card className="cards bord" body  style={{borderColor: '#0000' }}>
                    <CardBody>
                        
                    <li> 
                    <div>
                        <img className="cut" src={baseUrl + res3.img_src}/>
                      <h5 > <b>Dish Name: </b>{res3.Dish_Name}</h5>
                      <h5> <b>Price: </b>{res3.Price}</h5>
                      <h5> <b>Serving: </b>{res3.Serving}</h5>
                      
                    </div>

                    
                      </li> 
                        </CardBody>
                    </Card>
                </div>)

            
        })

        return (
            
            
        <div class="row">

            <div class= "columnX1">
            {abc}
            { this.props.review.insert?
           <div>
               <h1> already Reviewed</h1>
           </div>

                          
                
          
            :
                <form onSubmit= {this.onSubmit}>
                <input className = 'xx'
                        type="text" 
                        placeholder="Enter Rating"
                        value = {this.state.rating} 
                        onChange = {this.handleRchange}
                        />

            <input className = 'xx'
                        type="text" 
                        placeholder="Enter Your Comment"
                        value = {this.state.comment} 
                        onChange = {this.handleVchange}
                        />


                        <button 
                        type="submit">Submit Review </button>
        </form>
            }
            </div>
            <div class= "columnX2">
            <Label ><b>Customer Reviews:</b></Label>
                <div >
                <Card className="cards bord con" body  style={{borderColor: '#0000' }}>
                <CardBody>
                
                {abc2}

                </CardBody>
                </Card>
                </div>
            </div>

            <div class= "columnX3">
            <Label ><b>DISHES:</b></Label>
                <div >
                <Card className="cards bord con" body  style={{borderColor: '#0000' }}>
                <CardBody>
                
                {abc3}

                </CardBody>
                </Card>
                </div>
            </div>
        </div>


        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User_RestaurantView));