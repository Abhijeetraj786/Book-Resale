import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../Actions/productActions';
function ProductScreen(props){

    const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addTowishListHandler = () => {
    props.history.push(`/wishList/${productId}`);
  };


    return  <div>
     {loading ? "Loading..." : error ? "  Error occur  "  :
    <div>
        <div  className="backToHome">
        <Link to="/"><i class="fas fa-arrow-circle-left fa-2x"></i></Link>
        </div>
    {/* <div className="products-body"> */}
           {/* <div className="container">
           <div className="row"> */}
           {/* <div className="col-md-6"></div>  */}

           <div className="grid-container">
           <div className="grid-child1">
           <div><img src={product.image} alt={product.name} className="prod-image"/></div>
           </div>
           <div className="grid-child2">
           <div className="product-detail">
           <div className="book-name">Book Name: <strong>{product.name}</strong></div>
           <div className="publisher">Publisher: <strong>{product.publisher}</strong></div>
           <div className="price">Price:<strong>Rs.{product.price}</strong></div>
           <Link to={`/sellersDetail/${product._id}`}><button  className="primary block">Seller's detail</button></Link>
                       
                        <button
                          onClick={addTowishListHandler}
                          className="primary block"
                        >
                          Add to wishList
                        </button>
                      
           </div>
           </div>
           </div>
           {/* </div>
           </div> */}
    {/* </div> */}
    </div>
}

    </div>
}
export default ProductScreen;