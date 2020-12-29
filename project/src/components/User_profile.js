import React, { Component } from 'react'
import {GetUserDetails, fetchAllRestaurants, UploadImage , SetUserLocation} from '../redux/ActionCreators'
import { Card, CardImg, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, CardBody, CardText ,Button, Media, CardImgOverlay, Row,  Label, Col, Modal,ModalBody,ModalHeader} from 'reactstrap';
import { connect } from 'react-redux'
import Get_User_Location from './Get_User_Location'
import { Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';

const baseUrl='http://localhost:3003/'



const mapDispatchToProps = dispatch => ({   //saray calls r returned
    GetUserDetails : (values) =>    // call krunge to use dispatch
    {
        console.log("Inside mapdispatchtoProps" + values.Id);
        dispatch (GetUserDetails(values))   //sending values to the actioncreator wala validate_user
    },  

    fetchAllRestaurants: (values)=>
    {
        console.log("Inside mapdispatchtoProps Fetch all rest" + values.Id);
        dispatch(fetchAllRestaurants(values))
    },
    UploadImage: (m,a)=>
    {
        dispatch(UploadImage(m,a))
    },

    SetUserLocation : (values) =>    // call krunge to use dispatch
    {
        dispatch (SetUserLocation(values))   //sending values to the actioncreator wala validate_user
    }
}) 

const mapStateToProps = state=>{
    
    return{
      LoggedInUser: state.loggedinUser,
      restaurant : state.restaurants

    };
  }


export class User_profile extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            Id : this.props.login.Id,
            User : this.props.login.user,
            search : '',
            Curr_Location : this.props.LoggedInUser.CurrAddress,
            lat : this.props.LoggedInUser.lat,
            lon :this.props.LoggedInUser.lon,
            clicked: false,
            filter_Rating_value:-1,
            filter_Dishvalue : '',  //null // ""// 
            ismodalopen: false,
            ismodal1open:false,
            LocFilter : false,
        };
        this.openMaps=this.openMaps.bind(this);
        this.handleRFilterChange=this.handleRFilterChange.bind(this);
        this.handleDFilterChange=this.handleDFilterChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handledelete = this.handledelete.bind(this);
        this.FilterByLocation = this.FilterByLocation.bind(this);
        this.fileInput = React.createRef()
    }
    handleSubmit(event) {
        event.preventDefault();
        const formdata= new FormData();
        formdata.append("image",this.fileInput.current.files[0]);
        if(this.fileInput.current.files[0]){
            this.props.UploadImage(formdata,this.props.login.Id);
            setTimeout(() => {
                this.props.GetUserDetails(this.state)
            }, 500);
           
            this.setState({
                ismodal1open: !this.state.ismodal1open

            });
        }
        else{
            alert("Please Upload A photo")
        }
      }
    toggleModal(){
         
        this.setState({
            ismodalopen: !this.state.ismodalopen,
        });
        setTimeout(() => {
            this.props.GetUserDetails(this.state)
        }, 300);
    }
    toggleModal1(a){
         
        this.setState({
            ismodal1open: !this.state.ismodal1open,
            dish_id:a
        });
    }
    handledelete(a){
        this.props.del_dis(a);
        setTimeout(() => {
            this.props.GetUserDetails(this.state)
        }, 500);
      
    }
    openMaps(event) {
        event.preventDefault();
        this.setState({
            clicked: true
        })
    }

    FilterByLocation(event){
       event.preventDefault();
       this.setState({
           LocFilter : true
       });
    }
    updateSearch(event) {
    this.setState({search: event.target.value.substr(0,50)});
    }

    handleRFilterChange(event){
        this.setState({
            filter_Rating_value : event.target.value
        })
    }
    handleDFilterChange(event){
        console.log('Inside change cuisine event')
        this.setState({
            filter_Dishvalue : event.target.value
        })
        console.log(event.target.value);
    }
    RestClicked(event){
        event.preventDefault();
        alert("helo");
    }
  
    componentDidMount(){

    console.log("BEFORE DISPATCH" +this.state.Id)
    this.props.GetUserDetails(this.state)
    this.props.fetchAllRestaurants(this.state);
    }

    render() {
        if( this.state.lat && this.state.lon)
        {
            this.props.SetUserLocation(this.state);
        }

        if(this.state.clicked)
        {
            return(
                <div >
                    {console.log("inside if")}
                    <Redirect to="/getlocation"/>
                    {console.log("XXXXXXXXXXXXYYYYYYYYYYZZZZZ" + this.props.location)}
                    {console.log("HELLO AFTER STATE " + this.state.lat , this.state.lon)}
                </div>  
            )
        }
        const x=[] = this.props.restaurant.restaurants;

        let filteredRests=[];
        if(this.state.filter_Rating_value > 0){
            const a = this.state.filter_Rating_value;
            filteredRests = x.filter(
                (x) => {if(x.Rating >= a ){
                    return(x);}
                });
        }
        else if (this.state.filter_Dishvalue){
            const a = this.state.filter_Dishvalue;
            filteredRests = x.filter(function(item){
                return item.Cuisine_Type ==a;
             });
        }
        else if(this.state.LocFilter) {
            if(this.state.lat && this.state.lon){
                filteredRests = x.filter
                (
                    (x) => 
                    {
                        const lat1 = this.state.lat; const lon1 = this.state.lon; const lat2 = x.latitude ; const lon2 = x.longitude;
                        console.log("HERE ARE VALUES" , lat1 , lon1,lat2,lon2 );
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
                        console.log("DISTANCE IS " + d);
                        if(d <= 1500 )
                        {
                        return(x);
                        }
                    }
                );
            }
            else {
                alert("Enter Current Location First!");
               filteredRests= x
            }

        }
        else if (this.state.filter_Rating_value < 0){
        filteredRests= x.filter(
            (x) => {
                return x.Rest_Name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
            }


        );
    }
        const abc = filteredRests.map((res)=>{
            return(
                <Link to={`/user/${res.Restaurant_ID}`}> 
                    <div key={res.Restaurant_ID} className = 'Resturant-info-container'>
                        
                        <div className="row">
                            <div className="col-6 mx-auto">
                                {(this.state.filter_Rating_value) ? console.log("rating afhihsisijs") : <></>}
                                {(this.state.filter_Dishvalue) ? console.log("dish cuisine afhihsisijs") : <></>}
                                {res.img_src !== null?
                                <img src={baseUrl + res.img_src} style={{float:'left' , width : 150, height : 150}}/>
                                :
                                <img src={baseUrl +  "images/noimage.png"} style={{float:'left' , width : 150, height : 150}}/>
                                }
                            </div>
                            
                           <div className="mx-auto center">
                            <h2 style={{float:'right'}}>{res.Rest_Name}
                                    <h4><a href = "{res.Website}">{res.Website}</a> </h4>
                                        <h4>Cuisine_Type : {res.Cuisine_Type}</h4>
                                       {res.Rating?
                                        <h4>Rating : {res.Rating}/5</h4>:
                                        <h4>No Rating</h4>}
                                </h2>
                           </div>
                        </div>  
                    </div>
                </Link>
            )
        })

        return (
            <div class="row contain">
                <div class="columnX">
                    <div class = "center-pic">
                        <div className = "picc">
                        {this.props.LoggedInUser.imgsrc !== null?
                                <img src={baseUrl + this.props.LoggedInUser.imgsrc} alt="Avatar" align = 'center' style={{borderRadius:50 , width : 100
                                    , alignSelf : 'center' }}></img>
                                :
                                <img src={baseUrl +  "images/noimage.png"} alt="Avatar" align = 'center' style={{borderRadius:50 , width : 100
                                    , alignSelf : 'center' }}></img>
                                }
                       
                        </div>
                        <Row className="form-group">
                            <Col md={{size: 12, offset: 0}}>
                            <Button outline onClick={()=>this.toggleModal1(this.props.login.Id)}><span className="fa fa-image font-weight-bold">Upload image</span></Button>                                          
                            <Modal className=" tfont shadows " isOpen={this.state.ismodal1open} toggle={this.toggleModal1}> 
                            <ModalBody className=" shadows">
                                <div>
                                    <form onSubmit={this.handleSubmit}>
                                        <label>
                                            Upload file:
                                            <input type="file" ref={this.fileInput} />
                                        </label>
                                    <br />
                                    <button type="submit">Submit</button>
                                    </form>
                                </div>
                                <Button outline onClick={this.toggleModal1}><span className="fa fa-backward"></span>Back</Button>
                            </ModalBody>
                            </Modal>
                            </Col>
                        </Row>
                    </div>
                    <div className ='User-info-container'>
                        <h1 className = 'userText'>{this.props.LoggedInUser.FName} {this.props.LoggedInUser.LName}</h1>
                        <h4 className='userText'>Home Address : {this.props.LoggedInUser.Address}</h4> 
                        {(!this.props.LoggedInUser.currAddress)?
                        <div className = 'userText'>
                            <input type="button" value="Use Current Location" onClick={this.openMaps} />
                            {console.log("potts")}
                        </div>
                        :
                        <>  
                            <h4 className='userText'>Current Location : {this.props.LoggedInUser.currAddress}</h4>
                            <div className = 'userText'>
                                <input type="button" value="Use Current Location" onClick={this.openMaps} />
                                {console.log("potts")}
                            </div>
                            {console.log(this.props.LoggedInUser.lat)}
                            {console.log(this.props.LoggedInUser.lon)}
                        </>}
                    </div>
                </div>
                <div class="columnY">
                    <div style={{marginBottom: 50}}>
                        <input style = {{width : 1000, marginLeft:70}} placeHolder = 'Search by Restaurant name'type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                        <div style={{marginLeft:70 , marginRight:50}}>
                            <label>
                                Filter by rating:
                                <select value={this.state.filter_Rating_value} onChange={this.handleRFilterChange}>
                                    <option value="-1">All</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option> 
                                    <option value="1">1</option>
                                </select>
                            </label>
                            <label style={{marginLeft:40}}>
                                Filter by Cuisine Type:
                                <select value={this.state.filter_Dishvalue} onChange={this.handleDFilterChange}>
                                    <option value="">All</option>
                                    <option value="Desi">Desi</option>
                                    <option value="Italian">Italian</option>
                                    <option  value="Western">Western</option>
                                    <option  value="Mexican">Mexican</option>
                                    <option  value="Chinese">Chinese</option>
                                </select>
                            </label>
                            <label style={{marginLeft:40}} >
                               <h4>Filter Using Location</h4>
                               <Button variant="outlined" size="small" color="primary" onClick  ={this.FilterByLocation}>
                                    Filter Restaurants
                            </Button>
                            </label>
                        </div>
                    </div>
                    {(filteredRests[0]) ? 
                    <div className="col-10 mx-auto col-md-8">
                        <Card className="cards bord shadow">
                            <div className = 'scroll-container'>

                                {abc}
                            </div>
                        </Card>
                        
                        </div>
                     :   
                    <div style={{marginLeft : 70}}>
                        <h1>No Result found</h1>
                    </div>
                        
                    }
                </div>   
          </div>


        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User_profile));