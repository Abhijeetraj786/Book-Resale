import { PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
   PRODUCT_LIST_FAIL, 
  PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS,
   PRODUCT_UPLOAD_REQUEST,
   PRODUCT_UPLOAD_SUCCESS,
   PRODUCT_UPLOAD_FAIL,
   PRODUCT_UPLOAD_RESET,
   PRODUCT_MINE_LIST_REQUEST,
   PRODUCT_MINE_LIST_SUCCESS,
   PRODUCT_MINE_LIST_FAIL,
   PRODUCT_DELETE_REQUEST,
   PRODUCT_DELETE_SUCCESS,
   PRODUCT_DELETE_FAIL,
   PRODUCT_DELETE_RESET,
   USER_ADDRESS_MAP_CONFIRM,
   SAVE_PRODUCT_UPLOAD_DETAILS
 } from "../constants/productConstants";



export  const productListReducer=(state={products:[]},action)=>{
 switch(action.type){
    case PRODUCT_LIST_REQUEST:
       return {loading: true};
    case PRODUCT_LIST_SUCCESS:
        return{
        loading: false , products:action.payload
        }
    case PRODUCT_LIST_FAIL:
        return{loading:false ,error:action.payload}
    default:
        return state;
 }
}

export  const productUploadReducer=(state={product:{}},action)=>{
  switch(action.type){
     case PRODUCT_UPLOAD_REQUEST:
        return {loading:true};
     case PRODUCT_UPLOAD_SUCCESS:
         return{
         loading:false ,success: true, product: action.payload
         };
     case PRODUCT_UPLOAD_FAIL:
         return{loading:false ,error:action.payload};
     case PRODUCT_UPLOAD_RESET:
         return {};
     default:
         return state;
  }
 }

export const productDetailsReducer = (
    state = { product: {}, loading: true },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const productMineListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_MINE_LIST_REQUEST:
        return { loading: true };
      case PRODUCT_MINE_LIST_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };



  export const userAddressMapReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_MAP_CONFIRM:
        return { address: action.payload };
      default:
        return state;
    }
  };

  export const saveProductUploadDetailsReducer = (state = {}, action) =>{
    switch(action.type){
      case SAVE_PRODUCT_UPLOAD_DETAILS:
        return { product: action.payload };
      default:
        return state;
    }
  };