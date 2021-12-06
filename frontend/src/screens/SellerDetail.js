/* eslint-disable jsx-a11y/iframe-has-title */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../Actions/productActions';
import SellerChat from '../components/SellerChat';
function ProductScreen(props){
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [googleApiKey, setGoogleApiKey] = useState('');
  
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios('/api/config/google');
      setGoogleApiKey(data);
    };
    fetch();
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

    return loading ? "Loading..." : error ? "  Error occur  "  :<>
    <div  className="backToHome">
      <Link to="/"><i class="fas fa-arrow-circle-left fa-2x"></i></Link>
    </div> 
    <div className="products-body">
      <div className="product-detail">
        <div>Seller's Name: <strong>{product.sellerName}</strong></div>
        <div>Mobile Number: <strong>{product.phNumber}</strong></div>
        <div>Address: <strong>{product.address}</strong></div>
        <div>Pin Code: <strong>{product.pincode}</strong></div>
        {product.sellerId!==userInfo._id?<SellerChat sellerId={product.sellerId} sellername={product.sellerName}/>:""}
      </div>
      <div className="product-detail">
        <div><strong>Seller Location:</strong></div>
        <div>
          <iframe
            style= {{width: "600px", height:"400px",border: "0.1rem ridge grey", marginTop:"1rem"}}
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}
            &q=${product.lat},${product.lng}`}>
          </iframe>
        </div>
      </div>
    </div>
    </>
}
export default ProductScreen;