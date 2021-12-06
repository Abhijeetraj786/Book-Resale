import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWishList, removeFromWishList } from '../Actions/wishListActions';
import $ from 'jquery';
export default function WishListScreen(props) {
    const productId = props.match.params.id;
    const wishList = useSelector((state) => state.wishList);
    const { wishListItems } = wishList;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToWishList(productId));
      }
    }, [dispatch, productId]);
    const removeFromWishListHandler = (id) => {
        // delete action
        dispatch(removeFromWishList(id));
      };
     
    $(document).ready(function(){
        // $('.empty-note').slideToggle();
        $('.empty-note').css('fontSize','4rem');
        $('.empty-note').fadeToggle();
        // $('.empty-note').css('fontSize','2rem');
    });  

      return (
        <div className="container">
          <div className="inner-container">
            {wishListItems.length === 0 ? (
              <h1 style={{fontSize:"3vw", marginTop:"100px", alignItems:"center", textAlign:"center"}} className="empty-note">
                WishList is empty.<br></br>
                <img src="data:image/png;base64,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" alt="" style={{height:"16vw", width:"16vw"}}></img>
                <br></br><Link to="/">Go Shopping</Link>
              </h1>
            ) : (
              <ul className="ul-list">
                {wishListItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div>
                      <Link to={`/product/${item.product}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small"
                        ></img>
                        </Link>
                        <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                      </div>
                      
                      <div className="wish-button">
                        <button
                          type="button" className="primary"
                          onClick={() => removeFromWishListHandler(item.product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
            )}
          </div>
        </div>
      );
    }
    