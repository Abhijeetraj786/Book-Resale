import {React,useEffect,useState} from 'react';
import socketIOClient from 'socket.io-client';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import WishListScreen from './screens/WishListScreen';
import {useDispatch, useSelector } from 'react-redux';
import { signout } from './Actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductUploadScreen from './screens/ProductUploadScreen';
import SellerDetail from './screens/SellerDetail';
import PrivateRoute from './components/PrivateRoute';
import ProductHistoryScreen from './screens/ProductHistoryScreen';
import ChatScreen from './screens/ChatScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

function App() {
  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;
  const [socket, setSocket] = useState(null);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
useEffect(() => {
  if(userInfo){
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit('onLogin', {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
    }
  }
 
}, [socket, userInfo])
  const openMenu = () =>{
    document.querySelector(".sidemenu").classList.add('open');
  }
  const closeMenu = () =>{
    document.querySelector(".sidemenu").classList.remove('open');
  }
  return (
  <BrowserRouter>
    <div className="gid-container">
              <header className="row">
                <div>
                  <button onClick={openMenu} className="ham-button">
                    &#9776;
                  </button>
              
                  <Link className="brand" to="/">
                    Books Store
                  </Link>
                </div>
                <div className="wishList-button">
                 <Link to="/wishlist">Wishlist
                 {wishListItems.length > 0 && (
                <span className="badge">{wishListItems.length}</span>
              )}
                 </Link>
                 {userInfo ? (
              <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
                </div>
              </header>

              <aside className = "sidemenu">
                <div className="sideMenuUp">
                 Book Store
                 <button className = "sidemenuCloseButton" onClick = {closeMenu}>X</button>
                </div>
                
                <div className="middle">
                  <ul>
                    <li className="asideItem">
                      <Link to="/productUpload" className="asideItem-text" onClick={closeMenu} >Sell</Link>
                    </li>
                    <li className="asideItem">
                    <Link to="/chat" className="asideItem-text" onClick={closeMenu}>Chats</Link>
                  </li>
                    <li className="asideItem">
                      <Link to="/producthistory" className="asideItem-text" onClick={closeMenu}>Product History</Link>
                    </li>
                    <li className="asideItem">
                      <Link to="/" className="asideItem-text" onClick={closeMenu} >About Us</Link>
                    </li>
                    </ul>
                    </div>
                    <div className="sideMenuDown">
                    </div>
              </aside>
              <main>
                <Route
                  path="/search/name/:name?"
                  component={SearchScreen}
                  exact={true}
                ></Route>
                <Route path="/wishList/:id?" component={WishListScreen}></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/" component={HomeScreen} exact={true} ></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <PrivateRoute path="/productUpload" component={ProductUploadScreen}></PrivateRoute>
                <PrivateRoute path="/sellersDetail/:id" component={SellerDetail}></PrivateRoute>
                <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
                <PrivateRoute path="/producthistory" component={ProductHistoryScreen}></PrivateRoute>
                <PrivateRoute path="/chat" component={ChatScreen}></PrivateRoute>
                <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
              </main>
              <footer className="row center">
          <div>All right reserved</div>{' '}
        </footer>
            </div>
  </BrowserRouter>
            
  );
}

export default App;
