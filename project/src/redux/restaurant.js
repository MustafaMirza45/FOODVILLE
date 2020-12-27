
import * as ActionTypes from './ActionTypes';
let def= [{address:null,lat:null,lng:null}];

export const Restaurant =(state = {
    isLoading: true,
    errMess:null,
    location:[
        {
        address: null,
        lat: null,
        lng: null
        }
    ],
    restaurants:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_RESTAURANT:
            
            return {...state,isLoading: false, errMess: null, location:def,restaurants: action.payload};

        case ActionTypes.RESTAURANT_LOADING:

            return {...state, isLoading: true, errMess: null, location:def,restaurants: []}
        case ActionTypes.RESTAURANT_FAILED:

            return {...state, isLoading: true, errMess: action.payload, location:def,restaurants: []}
        case ActionTypes.POST_RESTAURANT_FAIL:

            return {...state, errMess: action.payload,location: def}
        case ActionTypes.RESTAURANT_ADDRESS:
            
            return {...state, location: action.payload}
        case ActionTypes.RESTAURANT_UPLOAD:
        
            return state
        case ActionTypes.RESTAURANT_UPLOAD_FAIL:
    
            return state


        default:
            return state;
    }
}