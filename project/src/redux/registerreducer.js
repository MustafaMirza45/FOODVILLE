
import * as ActionTypes from './ActionTypes';

export const Regreducer =(state = {
   
    minsert: true,
   uinsert: true
}, action) =>{
    switch(action.type){

        case ActionTypes.SEND_MANAGER:
            
                return{...state,minsert: action.payload.Insert};     
               
        case ActionTypes.SEND_MANAGER_FAILED:
                
                return state;
        case ActionTypes.SEND_USER:
    
            return{...state,uinsert: action.payload.Insert};     
            
        case ActionTypes.SEND_USER_FAILED:
            
            return state;
        
        default:
            return state;
    }
}