import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2 style={{color:"white", fontSize:"2rem"}}>{product.name}</h2>
            <h2 style={{color:"white", fontSize:"2rem"}}>{product.publisher}</h2>
          </Link>
          <div className="price">Rs {product.price}</div>
        </div>
    </div>
  );
}