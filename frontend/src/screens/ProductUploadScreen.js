import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct } from '../Actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPLOAD_RESET, SAVE_PRODUCT_UPLOAD_DETAILS } from '../constants/productConstants';

export default function SellScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;
  const dispatch = useDispatch();
  const uploadProductDetails = useSelector((state) => state.uploadProductDetails);
  const {product}  = uploadProductDetails;
  const [name, setName] = useState(product?product.name:"");
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(product?product.price:"");
  const [publisher, setPublisher] = useState(product?product.publisher:"");
  const [description, setDescription] = useState(product?product.description:"");
  const [sellerName, setSellerName] = useState(product?product.sellerName:userInfo.name);
  const [sellerEmail, setSellerEmail] = useState(userInfo.email);
  const [phNumber, setPhNumber] = useState(product?product.phNumber:userInfo.phNumber);
  const [address, setAddress]= useState(addressMap?addressMap.address:'');
  const [pinCode, setPinCode]= useState(addressMap?addressMap.pinCode:'');
  const productUpload = useSelector((state) => state.productUpload);
  const { loading, error, success} = productUpload;
  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPLOAD_RESET });
      props.history.push('/');
    }
  },[dispatch,success,props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    if(addressMap){
      const bodyFormData = new FormData();
      bodyFormData.append('name',name);
      bodyFormData.append('image',image);
      bodyFormData.append('price',price);
      bodyFormData.append('publisher',publisher);
      bodyFormData.append('sellerName',sellerName);
      bodyFormData.append('sellerId',userInfo._id);
      bodyFormData.append('description',description);
      bodyFormData.append('sellerEmail',sellerEmail);
      bodyFormData.append('phNumber',phNumber);
      bodyFormData.append('pinCode',pinCode);
      bodyFormData.append('address',address);
      bodyFormData.append('lat',addressMap.lat);
      bodyFormData.append('lng',addressMap.lng);
      dispatch(uploadProduct(bodyFormData));
    }
  }

  const chooseOnMap = () => {
    dispatch({
      type: SAVE_PRODUCT_UPLOAD_DETAILS,
      payload: {
        name,
        image,
        price,
        publisher,
        description,
        sellerName,
        phNumber
      },
    });
    props.history.push('/map');
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Upload Product</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && <MessageBox variant="success">Product Uploaded Successfully.</MessageBox>}
        <div>
          <label htmlFor="name">Book Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter book name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="image">Book Image</label>
          <input
            type="file"
            id="image"
            label="Choose Image"
            required
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="publisher">Publisher Name</label>
          <input
            type="text"
            id="publisher"
            value={publisher}
            placeholder="Enter publisher name"
            required
            onChange={(e) => setPublisher(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            placeholder="Enter description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="sellername">Seller Name</label>
          <input
            type="text"
            id="sellername"
           value={sellerName}
            required
            onChange={(e) => setSellerName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="sellerEmail">Seller Email</label>
          <input
            type="text"
            id="sellerEmail"
            value={sellerEmail}
            disabled
            required
            onChange={(e) => setSellerEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phNumber">Mobile Number</label>
          <input
            type="text"
            id="phNumber"
            value={phNumber}
            required
            onChange={(e) => setPhNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button style={{color: "white"}} type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        
        <div>
          <label htmlFor="pincode">Pin Code</label>
          <input
            type="text"
            id="pincode"
            value={pinCode}
            placeholder="Enter pincode"
            required
            onChange={(e) => setPinCode(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary" type="submit">
           Upload Product
          </button>
        </div>
      </form>
    </div>
  );
}