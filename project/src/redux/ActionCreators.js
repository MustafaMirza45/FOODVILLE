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

export const imgupl = (formdata)=>(dispatch) =>{
    return fetch(baseUrl + "upload",{
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
    type: ActionTypes.RESTAURANT_UPLOAD_FAIL,
    payload: res
})