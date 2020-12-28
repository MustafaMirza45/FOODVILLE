import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Managers } from './managers';
import {createForms} from 'react-redux-form';
import { Restaurant } from './restaurant';
import { LoginReducer } from './LoginReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {User_Profile_Reducer} from './User_Profile_Reducer';
import { dishadd, InitialRegister,InitialUserRegister,RestaurantRegister  } from './forms';
import {Regreducer} from './registerreducer';
import { Dishes } from './DishReducer';
import { Review } from './reviewReducer';


export const ConfigureStore = () => {
    const store = createStore(
       
       combineReducers({
         managers: Managers,
         restaurants: Restaurant,
         login: LoginReducer,
         loggedinUser: User_Profile_Reducer,
         registeration: Regreducer,
         dishes: Dishes,
         review: Review,
         ...createForms({
            register: InitialRegister,
            userregister: InitialUserRegister,
            restaurant: RestaurantRegister,
            dish: dishadd
         })
       }) ,composeWithDevTools(applyMiddleware(thunk,logger))
       

    );
    return store;
    
}
