import * as ActionTypes from './ActionTypes';

const baseUrl='http://localhost:3003/'


//for managers
export const fetchManagers = (a) => (dispatch) => {

    dispatch(managersLoading(true));

    return fetch(baseUrl + 'manager/'+ a )
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(addmanager(data))})
        .catch(error => dispatch(managerfailed(error.message)));
};

export const managersLoading= ()=>({
    type: ActionTypes.MANAGER_LOADING
});
export const managerfailed= (errmess)=>({
    type:ActionTypes.MANAGER_FAILED,
    payload: errmess
});
export const addmanager = (managers) => 
   {
    return(
        {
            type: ActionTypes.ADD_MANAGER,
             payload: managers
        }
    );
    
};

//////////////////////////////////  ALLLLL RESTURANTSSSSS  ////////////////////////

export const fetchAllRestaurants = (values) => (dispatch) => {

    console.log("THIS IS THE USER ID IM GETTING " + values);
      
    return fetch(baseUrl + 'AllRestaurants', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(LOAD_ALL_RESTAURANTS(data))})
        .catch(error => dispatch(LOAD_RESTAURANTS_FAIL(error.message)));
};

export const LOAD_ALL_RESTAURANTS= (data)=>
(   
    console.log('INSIDE USER PROFILEEE'+ data),
    {
    type: ActionTypes.LOAD_ALL_RESTAURANTS,
    payload : data
});

export const LOAD_RESTAURANTS_FAIL= (errmess)=>
(   
    console.log('RESTURAANNTT FAAAIIILLL' + errmess),
    {
    type: ActionTypes.LOAD_RESTAURANTS_FAIL,
    payload : errmess
});




//for restaurants
export const fetchRestaurant = (a) => (dispatch) => {

    dispatch(restaurantLoading(true));

    return fetch(baseUrl + 'restaurant/'+a)
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(addrestaurant(data))})
        .catch(error => dispatch(restaurantfailed(error.message)));
};

export const restaurantLoading= ()=>({
    type: ActionTypes.RESTAURANT_LOADING
});
export const restaurantfailed= (errmess)=>({
    type:ActionTypes.RESTAURANT_FAILED,
    payload: errmess
});
export const addrestaurant = (restaurant) => 
   {
    
    return(
        {
            type: ActionTypes.ADD_RESTAURANT,
             payload: restaurant
        }
    );
    
};



//for validating login
export const Validate_User = (values) => (dispatch) => {

    console.log('YE AARAHA HAI ' + values.username);

    return fetch(baseUrl + 'validate', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok)
            {
                console.log("response ok");
                console.log(response);
                return response;    //fetched data??
            }
            else
            {
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => /*{console.log(response.json()) ; return*/ response.json())   //json mai convert
        .then((data)=> {dispatch(Login_Success(data))})   ///data will have return of response.json
        .catch(error => dispatch(Login_Failure(error.message)));
};

export const Login_Success= (data)=>
(   
    console.log('INSIDE LOGIN SUCCESS'+ data),
    {
    type: ActionTypes.LOGIN_SUCCESS,
    payload : data
});

export const Login_Failure= (errmess)=>
({
    type: ActionTypes.LOGIN_FAILURE,
    payload: errmess
});


export const logout = ()=>({
    type:ActionTypes.LOGOUT
});

//for sending review
export const Send_Review = (values)=> (dispatch) => {
    return fetch(baseUrl + "reviews",{
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     headers: {
       'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: JSON.stringify(values) // body data type must match "Content-Type" header
     })
     .then(response =>{
         if(response.ok){
             console.log("response ok");
             return response;
         }else{
             var error =new Error('Error '+ response.status + ': ' + response.statusText);
             console.log('Error '+ response.status + ': ' + response.statusText);
             error.response=response;
             throw error;
         }
     },
     error =>{
         var errmess= new Error(error.message);
         throw errmess;
     })
     .then(()=> {dispatch(sendrev(true))})
     .catch(error => dispatch(reviewfailed(error.message)));
 }

 export const sendrev= ()=>({
     type: ActionTypes.SEND_REVIEW
 });

 export const reviewfailed= (errmess)=>({
    type:ActionTypes.REVIEW_FAILED,
    payload: errmess
});

//for registering manager
export const sendmanager = (values)=> (dispatch) => {
    return fetch(baseUrl + "manager",{
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     headers: {
       'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: JSON.stringify(values) // body data type must match "Content-Type" header
     })
     .then(response =>{
         if(response.ok){
             console.log("response ok");
             return response;
         }else{
             var error =new Error('Error '+ response.status + ': ' + response.statusText);
             console.log('Error '+ response.status + ': ' + response.statusText);
             error.response=response;
             throw error;
         }
     },
     error =>{
         var errmess= new Error(error.message);
         throw errmess;
     })
     .then((response)=> response.json())
     .then((insert)=> {dispatch(sendman(insert))})
     .catch(error => dispatch(sendfailed(error.message)));
 }
 
 
 
 export const sendman= (insert)=>(
     console.log("inside sendman",insert),
     {
     type: ActionTypes.SEND_MANAGER,
     payload:insert
 });
 export const sendfailed = (error)=>({
     type: ActionTypes.SEND_MANAGER_FAILED,
     payload: error
 })
 


//////////// USER PROFILEEEE//////////////
export const GetUserDetails = (values) => (dispatch) => {
    console.log("THIS IS THE USER ID IM GETTING " + values);
    
    
    return fetch(baseUrl + 'userprofile', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(Load_user_profile(data))})
        .catch(error => dispatch(USER_DISPLAY_FAIL(error.message)));
};

export const Load_user_profile= (data)=>
(   
    console.log('INSIDE USER PROFILEEE'+ data),
    {
    type: ActionTypes.LOAD_USER_PROFILE,
    payload : data
});

export const USER_DISPLAY_FAIL= (errmess)=>
(   
    console.log('USER FAAAIIILLL' + errmess),
    {
    type: ActionTypes.USER_DISPLAY_FAIL,
    payload : errmess
});

export const Get_Curr_Location = (values) =>
(
    console.log("Inside get curr address"),
    {
        type : ActionTypes.GET_CURR_USER_ADDRESS,
        payload : values
    }
);


//////////////////////Restaurant Information//////////////////////////

export const fetchreviews = (values) => (dispatch) => {

    console.log("reviews that im fetching" + values);
      
    return fetch(baseUrl + 'FetchedReviews', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(fetch_review(data))})
        .catch(error => dispatch(fetch_review_failed(error.message)));
};

export const fetch_review= (data)=>
(   
    console.log('Inside Reviews'+ data),
    {
    type: ActionTypes.FETCH_REVIEW,
    payload : data
});

export const fetch_review_failed= (errmess)=>
(   
    console.log('Reviews failed to get' + errmess),
    {
    type: ActionTypes.FETCH_REVIEW_FAILED,
    payload : errmess
});


export const fetchdishes = (values) => (dispatch) => {

    console.log("dishes that im fetching" + values);
      
    return fetch(baseUrl + 'FetchedDishes', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
            dispatch(fetch_dish(data))})
        .catch(error => dispatch(fetch_dish_failed(error.message)));
};

export const fetch_dish= (data)=>
(   
    console.log('Inside Reviews'+ data),
    {
    type: ActionTypes.FETCH_DISHES,
    payload : data
});

export const fetch_dish_failed= (errmess)=>
(   
    console.log('Reviews failed to get' + errmess),
    {
    type: ActionTypes.FETCH_DISH_FAILED,
    payload : errmess
});
//////////////////////USER PIC UPLOAD/////////////

export const UploadImage = (formdata,a)=>(dispatch) =>{
    return fetch(baseUrl + "upload/user/"+ a , {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formdata // body data type must match "Content-Type" header
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(User_Pic_uploaded(response)))
        .catch(error =>dispatch(User_Pic_uploadfailed(error)));
}
export const User_Pic_uploadfailed = (err)=>({
    type: ActionTypes.DP_UPLOAD_FAIL,
    payload: err
})
export const User_Pic_uploaded = ()=>(
    {
    type: ActionTypes.DP_UPLOAD,
})

export const SetUserLocation = (values) => (dispatch) => {

    return fetch(baseUrl + 'UserLocation', {
        method : 'POST', headers : {'Content-Type':'application/json'} ,
        body : JSON.stringify(values)
    })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {
         dispatch(LocationSet(data))})
        .catch(error => dispatch(LocationSetFailed(error.message)));
};

export const LocationSetFailed = (err)=>(
    {
    type: ActionTypes.SET_LOCATION_FAILED,
    //payload : err
})
export const LocationSet = ()=>(
    {
    type: ActionTypes.SET_LOCATION,
})

 
 //sending user for register
 export const senduser = (values)=> (dispatch) => {
     return fetch(baseUrl + "user",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(values) // body data type must match "Content-Type" header
      })
      .then(response =>{
          if(response.ok){
              console.log("response ok");
              return response;
          }else{
              var error =new Error('Error '+ response.status + ': ' + response.statusText);
              console.log('Error '+ response.status + ': ' + response.statusText);
              error.response=response;
              throw error;
          }
      },
      error =>{
          var errmess= new Error(error.message);
          throw errmess;
      })
      .then((response)=> response.json())
      .then((insert)=> {dispatch(send_user(insert))})
      .catch(error => dispatch(senduser_failed(error.message)));
  }
 
 
 
 export const send_user= (insert)=>(
     console.log("inside send_user",insert),
     {
     type: ActionTypes.SEND_USER,
     payload:insert
 });
 export const senduser_failed = (error)=>({
     type: ActionTypes.SEND_USER_FAILED,
     payload: error
 })
 
 
 export const adduser = (users) => 
    {
     return(
         {
             type: ActionTypes.ADD_USER,
              payload: users
         }
     );
     
 };
 
 export const usersLoading= ()=>({
     type: ActionTypes.USER_LOADING
 });
 
 export const userfailed= (errmess)=>({
     type:ActionTypes.USER_FAILED,
     payload: errmess
 });


 export const Res_addr = (location) =>({
     type:ActionTypes.RESTAURANT_ADDRESS,
     payload: location
 })

 export const sendres = (values)=> (dispatch) => {
    return fetch(baseUrl + "restaurant",{
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: JSON.stringify(values) // body data type must match "Content-Type" header
     })
     .then(response =>{
         if(response.ok){
             console.log("response ok");
             return response;
         }else{
             var error =new Error('Error '+ response.status + ': ' + response.statusText);
             console.log('Error '+ response.status + ': ' + response.statusText);
             error.response=response;
             throw error;
         }
     },
     error =>{
         var errmess= new Error(error.message);
         throw errmess;
     })
     .then((response)=> response.json())
    
     .catch(error => dispatch(sendresfailed(error.message)));
 }

 export const sendresfailed = (error)=>({
    type: ActionTypes.POST_RESTAURANT_FAIL,
    payload: error
})

export const imgupl = (formdata,a)=>(dispatch) =>{
    return fetch(baseUrl + "upload/"+a,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formdata // body data type must match "Content-Type" header
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(uploaded(response)))
        .catch(error =>dispatch(uploadfailed(error)));
}
export const uploadfailed = (err)=>({
    type: ActionTypes.RESTAURANT_UPLOAD_FAIL,
    payload: err
})
export const uploaded = (res)=>(
    console.log(res),
    {
    type: ActionTypes.RESTAURANT_UPLOAD,
    payload: res
})
export const del_res = (a)=>(dispatch) =>{
    return fetch(baseUrl + "restaurant/"+a,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(deleted()))
        .catch(error =>dispatch(del_fail(error)));
}
export const deleted = ()=>(
    {
    type: ActionTypes.RESTAURANT_DELETE,

})
export const del_fail = (err)=>(
    {
    type: ActionTypes.RESTAURANT_DELETE_FAIL,
    payload: err
})


export const upd_res = (values,a)=>(dispatch) =>{
    console.log(values)
    return fetch(baseUrl + "restaurant/"+a,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(values)
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(updated()))
        .catch(error =>dispatch(upd_fail(error)));
}
export const updated = ()=>(
    {
    type: ActionTypes.RESTAURANT_UPDATE,

})
export const upd_fail = (err)=>(
    {
    type: ActionTypes.RESTAURANT_UPDATE_FAIL,
    payload: err
})

//for dishes
export const fetchDishes = (a) => (dispatch) => {

    dispatch(dishesloading(true));

    return fetch(baseUrl + 'dishes/'+ a )
        .then(response =>{
            if(response.ok){
                console.log("response ok",response);
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {console.log("data",data)
            dispatch(add_dish(data))})
        .catch(error => dispatch(dishfailed(error.message)));
};

export const dishesloading= ()=>({
    type: ActionTypes.DISH_LOADING
});
export const dishfailed= (errmess)=>({
    type:ActionTypes.DISH_FAILED,
    payload: errmess
});
export const add_dish = (dish) => 
   {
    return(
        {
            type: ActionTypes.ADD_DISH,
             payload: dish
        }
    );
}
    
export const senddish = (values,a)=> (dispatch) => {
    return fetch(baseUrl + "dishes/"+a,{
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     headers: {
       'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: JSON.stringify(values) // body data type must match "Content-Type" header
     })
     .then(response =>{
         if(response.ok){
             console.log("response ok");
             return response;
         }else{
             var error =new Error('Error '+ response.status + ': ' + response.statusText);
             console.log('Error '+ response.status + ': ' + response.statusText);
             error.response=response;
             throw error;
         }
     },
     error =>{
         var errmess= new Error(error.message);
         throw errmess;
     })
     .then((response)=> response.json())
     .then(()=> {dispatch(dishadd())})
     .catch(error => dispatch(add_dish_fail(error.message)));
 }
 
 
 
 export const dishadd= ()=>(
     {
     type: ActionTypes.SEND_DISH,
 });
 export const add_dish_fail = (error)=>({
     type: ActionTypes.ADD_DISH_FAILED,
     payload: error
 })

 export const imguplD = (formdata,a)=>(dispatch) =>{
    return fetch(baseUrl + "upload/dish/"+a,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: formdata // body data type must match "Content-Type" header
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(uploaded(response)))
        .catch(error =>dispatch(uploadfailed(error)));
}
export const uploadfailedD = (err)=>({
    type: ActionTypes.DISH_UPLOAD_FAIL,
    payload: err
})
export const uploadedD = (res)=>(
    console.log(res),
    {
    type: ActionTypes.DISH_UPLOAD,
    payload: res
})


export const del_dis = (a)=>(dispatch) =>{
    return fetch(baseUrl + "dishes/"+a,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(deleted_dis()))
        .catch(error =>dispatch(del_dis_fail(error)));
}
export const deleted_dis = ()=>(
    {
    type: ActionTypes.DISH_DELETE,

})
export const del_dis_fail = (err)=>(
    {
    type: ActionTypes.DISH_DELETE_FAIL,
    payload: err
})

export const upd_dis = (values,a)=>(dispatch) =>{
    console.log(values)
    return fetch(baseUrl + "dishes/"+a,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(values)
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(updated()))
        .catch(error =>dispatch(upd_fail(error)));
}
export const updateddis = ()=>(
    {
    type: ActionTypes.DISH_UPDATE,

})
export const upd_dis_fail = (err)=>(
    {
    type: ActionTypes.DISH_UPDATE_FAIL,
    payload: err
    })


    //for dishes
export const fetchReviews = (a) => (dispatch) => {

    dispatch(reviewsloading(true));

    return fetch(baseUrl + 'review/'+ a )
        .then(response =>{
            if(response.ok){
                console.log("response ok",response);
                return response;
            }else{
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
        error =>{
            var errmess= new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then((data)=> {console.log("data",data)
            dispatch(add_review(data))})
        .catch(error => dispatch(reviewfailed(error.message)));
};

export const reviewsloading= ()=>({
    type: ActionTypes.REVIEW_LOADING
});

export const add_review = (review) => 
   {
    return(
        {
            type: ActionTypes.ADD_REVIEW,
             payload: review
        }
    );
}
export const checkrev = (a)=>(dispatch) =>{
    console.log(a)
    return fetch(baseUrl + "reviews/check",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(a) // body data type must match "Content-Type" header
        })
        .then(response =>{
            if(response.ok){
                console.log("response ok");
                return response;
            }else{
                var error =new Error('Error '+ response.status + ': ' + response.statusText);
                console.log('Error '+ response.status + ': ' + response.statusText);
                error.response=response;
                throw error;
            }
        },
            error =>{
                var errmess= new Error(error.message);
                throw errmess;
        })
        .then((response)=> response.json())
        .then((response)=>  dispatch(checked(response)))
        .catch(error =>dispatch(failed(error)));
}
export const checked = (val)=>({
    type: ActionTypes.REVIEW_CHECK,
    payload: val
})
export const failed = (err)=>(
    {
    type: ActionTypes.REVIEW_FAILED,
    payload: err
})