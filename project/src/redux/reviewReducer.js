
import * as ActionTypes from './ActionTypes';

export const Review =(state = {
    isLoading: true,
    errMess:null,
    insert: false,
    review:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_REVIEW:
            
            return {...state,isLoading: false, errMess: null, review: action.payload};

        case ActionTypes.REVIEW_LOADING:

            return {...state, isLoading: true, errMess: null, review: []}
        case ActionTypes.REVIEW_FAILED:

            return {...state, isLoading: true, errMess: action.payload, review: []}
        case ActionTypes.REVIEW_CHECK:
            
            return{...state, insert: action.payload}
        case ActionTypes.SEND_REVIEW:
            
            return {...state,insert: true };
        case ActionTypes.FETCH_REVIEW:
        
            return {...state, errMess: null, review: action.payload};

        case ActionTypes.FETCH_REVIEW_FAILED:

            return {...state,errMess: action.payload, review: []}
    
        
        default:
            return state;
    }
}