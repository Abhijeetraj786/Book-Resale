import Axios from 'axios';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from '../constants/wishListConstants';

export const addToWishList = (productId) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: WISHLIST_ADD_ITEM ,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      product: data._id,
    },
  });
  localStorage.setItem('wishListItems', JSON.stringify(getState().wishList.wishListItems));
};

export const removeFromWishList = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
  localStorage.setItem('wishListItems', JSON.stringify(getState().wishList.wishListItems));
};