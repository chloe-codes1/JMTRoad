import React from "react";
import { Route, Switch } from "react-router-dom";
import EditStoreComponent from "./owner/EditStoreComponent";
import RegStoreComponent from "./owner/RegStoreComponent";
import OwnerLoginComponent from "./owner/OwnerLoginComponent";
import OwnerMainComponent from "./owner/OwnerMainComponent";
import NoStoreComponent from "./owner/NoStoreComponent"
import OneStoreComponent from "./owner/StorePageComponent"


const AppRouter = () => {
  return (
    <div>
      <div className="col-md-6" style={style}>
        <Switch>
          <Route exact path="/" component={OwnerLoginComponent} />
          <Route path="/ownerlogin"  component={OwnerLoginComponent} />
          <Route path="/regowners" component={RegStoreComponent} />
          <Route path="/ownerMain" component={OwnerMainComponent} />
          <Route path="/addstore" component={EditStoreComponent} />
          <Route path="/No" component={NoStoreComponent} />
          <Route path="/store" component={OneStoreComponent}/>

          
        </Switch>

      </div>
    </div>
  );
};

const style = {
  marginTop: "30px"
};

export default AppRouter;
