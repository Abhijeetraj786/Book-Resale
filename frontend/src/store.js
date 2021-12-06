import thunk from 'redux-thunk';
import {compose,createStore,applyMiddleware, combineReducers} from 'redux';
import { productDeleteReducer, productDetailsReducer, productListReducer, productMineListReducer, productUploadReducer, saveProductUploadDetailsReducer, userAddressMapReducer } from './Reducers/productReducers';
import { wishListReducer } from './Reducers/wishListReducers';
import {
  userRegisterReducer,
  userDetailsReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from './Reducers/userReducers';
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    },
    wishList: {
      wishListItems: localStorage.getItem('wishListItems')
        ? JSON.parse(localStorage.getItem('wishListItems'))
        : [],
    },
  };
const reducer= combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    wishList: wishListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productUpload:productUploadReducer,
    productMineList: productMineListReducer,
    productDelete: productDeleteReducer,
    userAddressMap: userAddressMapReducer,
    uploadProductDetails: saveProductUploadDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =createStore(reducer,initialState ,composeEnhancer(applyMiddleware(thunk)));

export default store;