import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import { fetchUser } from './store/actions/authActions';

import FrontPage from './components/frontPage';
import ProfilePage from './components/profilePage';
import ShopPage from './components/shopPage';
import ShowMenu from './components/showMenu';

function App(props) {
    useEffect(() => {
        props.fetch_user();
    }, [props])
    
  return (
      <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shops" component={ShopPage} />
          <Route path="/show_menu/:shopId/:tableNo" component={ShowMenu} />
      </Switch>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user:() => {dispatch(fetchUser())}
    }
}

export default connect(null, mapDispatchToProps)(App);
