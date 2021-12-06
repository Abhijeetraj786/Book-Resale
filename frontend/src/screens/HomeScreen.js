import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { listProducts } from '../Actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import SearchBox from '../components/SearchBox';

export default function HomeScreen() {
 const productList =useSelector(state =>state.productList);
 const dispatch =useDispatch();
 const {loading,error,products}=productList;
  useEffect(()=>{
   dispatch(listProducts({}));
  },[dispatch]);
  return (

    <div className="row center" style={{ display:"flex" ,flexDirection:"column",textAlign: "center", webkitBoxShadow: "4px 4px 4px #9E9E9E",mozBoxShadow: "4px 4px 4px #9E9E9E",boxShadow: "4px 4px 4px #9E9E9E"}}>
    
     <div className="search">
    <Route render={({ history }) => (
      <SearchBox history={history}></SearchBox>
     )}
    ></Route> 
   </div>

     <div>
      {
      loading ? <LoadingBox/> : error ?
      <MessageBox variant = "danger">{error}</MessageBox>:
      <div>
          {products.length === 0 && <MessageBox> No Product Found </MessageBox>}
        <div className="row center">
          {products.map((product) => (
           
                <Product key={product._id} product={product}></Product>
              ))}
        </div>
      </div>
      }</div>
      </div>
   
  );
}