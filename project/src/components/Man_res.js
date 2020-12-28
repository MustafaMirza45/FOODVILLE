/*eslint-disable*/
import { nodeName } from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect , withRouter} from 'react-router-dom';
import { Card, CardImg, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, CardBody, CardText ,Button, Media, CardImgOverlay, Row,  Label, Col, Modal,ModalBody,ModalHeader} from 'reactstrap';
import { fetchDishes, fetchRestaurant, imguplD,del_dis, fetchReviews} from '../redux/ActionCreators';
import { connect } from 'react-redux';
import  Map  from './maps/mapsimp';

import Tabs from "./tab/Tabs"; 
import Add_dish from './add_dish';
const baseUrl='http://localhost:3003/'

const mapStateToProps = state=>{
    
    return{
        review: state.review,
        restaurant: state.restaurants,
        dish: state.dishes
    };
  }
  const mapDispatchToProps = dispatch => ({
    fetchRestaurant: (m)=>{dispatch(fetchRestaurant(m))},
    fetchDishes: (m)=>{dispatch(fetchDishes(m))},
    fetchReviews: (m)=>{dispatch(fetchReviews(m))},
    imguplD: (m,a)=>{dispatch(imguplD(m,a))},
    del_dis: (a)=>{dispatch(del_dis(a))}
  });




class Man_res extends Component {// same as making a  menu function
    constructor(props){
        super(props);
        this.state={
            dish_id:null,
            ismodalopen: false,
            ismodal1open:false

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handledelete = this.handledelete.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        const formdata= new FormData();
        formdata.append("image",this.fileInput.current.files[0]);
        if(this.fileInput.current.files[0]){
            this.props.imguplD(formdata,this.state.dish_id);
            setTimeout(() => {
                this.props.fetchDishes(this.props.id);
            }, 500);
           
            this.setState({
                ismodal1open: !this.state.ismodal1open

            });
        }
        else{
            alert("please upload photo")
        }
      }
      toggleModal(){
         
        this.setState({
            ismodalopen: !this.state.ismodalopen,
        });
        setTimeout(() => {
            this.props.fetchDishes(this.props.id);
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
            this.props.fetchDishes(this.props.id);
        }, 500);
      
    }
    componentDidMount(){
        this.props.fetchRestaurant(this.props.login.Id);
        this.props.fetchDishes(this.props.id);
        this.props.fetchReviews(this.props.id);
    }
     render(){
        const res = this.props.restaurant.restaurants.filter((res) => res.Restaurant_ID === parseInt(this.props.id,10))[0];
        console.log(this.props.dish)
        const restaurant =()=>{
            return(
               
                <div key={res.Restaurant_ID} label={res.Rest_Name} >
                  
                    <Card className="cards bord shadow" body  style={{borderColor: '#0000' }}>
                    <div className="row">
                            <Breadcrumb className="navr">
                                    <BreadcrumbItem><Link to="/manager">Profile</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{res.Rest_Name}</BreadcrumbItem>
                            </Breadcrumb>
                    </div>
                      
                            <div className="block1    mx-auto">
                               
                                {res.img_src === null?
                                <CardImg className="cut" width="100%" src={baseUrl + "images/default.jpg"} alt={res.Rest_Name} />
                                :    
                                <CardImg className="cut" width="100%"  src={baseUrl + res.img_src} alt={res.Rest_Name} />  
                                }
                            </div>
                       
                       
                       
                        <CardHeader className="center"><CardTitle><h3 className="tfont"><b>{res.Rest_Name}</b></h3></CardTitle></CardHeader>
                        <CardBody className="card-body">
                            <CardText><b>Cuisine: </b> {res.Cuisine_Type}</CardText>
                            {res.Rating?
                             <CardText><b>Rating: </b>{res.Rating}</CardText>:
                             <CardText><b>Rating: </b>No Ratings</CardText>}
                           
                            <CardText><b>Contact_no: </b>{res.Contact_no}</CardText>
                            <CardText><b>Website: </b><a href={"https://"+ res.Website} target="_blank">{res.Website}</a></CardText>
                            {res.Latitude === null?
                                <div className=" border center">
                                   <CardText>location not added</CardText>
                                </div>
                            :
                            
                                <Map
                                    google={this.props.google}
                                    center={{ lat: res.Latitude, lng:  res.Longitude}}
                                    height='300px'
                                    zoom={15}
                                    lat={res.Latitude}
                                    lng={res.Longitude}
                                
                                />
                            }
                           
                        </CardBody>
                    </Card>
                </div>
                )               
            }
        
            const dishes = this.props.dish.dishes.map((dish)=>{
                return(
                   
                    <div key={dish.Dish_ID} label={dish.Dish_name} >
                      
                        <Card className="cards bord shadow" body  style={{borderColor: '#0000' }}>
                          
                                <div className="block1    mx-auto">
                                   
                                    {dish.img_src === null?
                                    <CardImg className="cut1" width="100%" src={baseUrl + "images/noimage.png"} alt={dish.Dish_name} />
                                    :    
                                    <CardImg className="cut1" width="100%"  src={baseUrl + dish.img_src} alt={dish.Dish_name} />  
                                    }
                                     <Row className="form-group">
                                            <Col md={{size: 12, offset: 0}}>
                                            <Button outline onClick={()=>this.toggleModal1(dish.Dish_ID)}><span className="fa fa-image font-weight-bold">Upload image</span></Button>
                                                                                        
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
                           
                           
                           
                            <CardHeader className="center"><CardTitle><h3 className="tfont"><b>{dish.Dish_name}</b></h3></CardTitle></CardHeader>
                            <CardBody className="card-body">
                                <CardText><b>Price: Rs.</b> {dish.Price}</CardText>
                                <CardText><b>Serving: </b>{dish.Serving}</CardText>
                               
                            </CardBody>
                            <div className="ml-auto">
                                <Link to={`/dish/${dish.Dish_ID}`}>
                                    <button className="colo font-weight-bold" >Edit Details</button>   
                                </Link>
                                <Button outline onClick={()=>this.handledelete(dish.Dish_ID)}><span className="fa fa-trash-o font-weight-bold">Delete Dish</span></Button>
                            </div>
                           
                        </Card>
                    </div>
                    )               
                })
                const review = this.props.review.review.map((rev)=>{
                    return(
                       
                        <div key={rev.User_name}  >
                          
                            <Card className="cards bord shadow" body  style={{borderColor: '#0000' }}>

                                <CardHeader className="center"><CardTitle><h3 className="tfont"><b>{rev.User_name}</b></h3></CardTitle></CardHeader>
                                <CardBody className="card-body">
                                    <CardText><b>Rating: </b> {rev.Rate}</CardText>
                                    <CardText><b>Comment: </b>{rev.Comment}</CardText>
                                   
                                </CardBody>        
                            </Card>
                        </div>
                        )               
                    })

            if(this.props.restaurant.isLoading){
                return(
                    <div>
                        <h1>loading</h1>
                    </div>
                )
            }else{
                return(
                    <div className=" row row-content">
                      <div className="col-3 col col-md-3 ">
                        {restaurant()}
                      </div>
                      <div className="col-5 col col-md-5 ">
                          <Card className="colo2">
                            <Row className="form-group">
                                    <Col md={{size: 12, offset: 0}}>
                                    <Button outline onClick={()=>this.toggleModal(res.Restaurant_ID)} className="colo3"> <span className="fa fa-delicious colo3"  >Add Dish</span></Button>
                                                                                
                                <Modal className=" tfont shadows " isOpen={this.state.ismodalopen} toggle={this.toggleModal}>
                                    
                                    <ModalBody className=" shadows">
                                        <Add_dish resetform={this.props.resetform} toggle={()=>this.toggleModal()} id={res.Restaurant_ID}/>
                                        <Button outline onClick={this.toggleModal}><span className="fa fa-backward"></span>Back</Button>
                                    </ModalBody>
                                    
                                </Modal>
                                    
                                    </Col>
                            </Row>
                           <div className="divis">
                               {this.props.dish.dishes.length ===0?
                                <Card>
                                    <div className="cards bord" label="None Registered">
                                        <h1>Looks a little empty why dont you add some dishes</h1>
                                    </div>
                                </Card>
                               :<>
                                {dishes}
                                </>
                                }
                               
                           </div>
                            
                          </Card>
                           
                      </div>
                      {this.props.review.review.length ===0 ?
                            <div className="col-4 col col-md-4 divis">
                            <Card className="colo2 ">
                                <Card>
                                    <div className="cards bord" label="None Registered">
                                            <h3>no reviews yet</h3>
                                    </div>
                                </Card>
                            </Card>
                            </div>
                      :
                        <div className="col-4 col col-md-4 divis">
                            <Card className="colo2 ">
                                {review}
                            </Card>
                        </div>
                      }
                     

                    </div>
                )
    
            }
            
    };



}
export  default withRouter(connect(mapStateToProps,mapDispatchToProps)(Man_res));