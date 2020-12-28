
import * as ActionTypes from './ActionTypes';

export const Dishes =(state = {
    isLoading: true,
    errMess:null,
    insert: true,
    dishes:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISH:
            
            return {...state,isLoading: false, errMess: null, dishes: action.payload};

        case ActionTypes.DISH_LOADING:

            return {...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.DISH_FAILED:

            return {...state, isLoading: true, errMess: action.payload, dishes: []}
        case ActionTypes.ADD_DISH_FAILED:

            return {...state, isLoading: true, errMess: action.payload, dishes: []}
        case ActionTypes.SEND_DISH:

            return state;
        case ActionTypes.DISH_UPLOAD:

            return state;
        case ActionTypes.DISH_UPLOAD_FAIL:

           return {...state, isLoading: true, errMess: action.payload, dishes: []}
        case ActionTypes.DISH_DELETE:

            return state;
        case ActionTypes.DISH_DELETE_FAIL:

            return {...state, isLoading: true, errMess: action.payload, dishes: []}
        case ActionTypes.DISH_UPDATE:

            return state;
        case ActionTypes.DISH_UPDATE_FAIL:

            return {...state, isLoading: true, errMess: action.payload, dishes: []}
        case ActionTypes.FETCH_DISHES:
            
            return {...state, errMess: null, dishes: action.payload};

        case ActionTypes.FETCH_DISH_FAILED:

            return {...state,errMess: action.payload, dishes: []}
        default:
            return state;
    }
}