import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import LoginScreen from "./pages/login";
import Home from "./pages/home";
import Messages from "./pages/messages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Profile from "./pages/profile";
import { useSelector } from "react-redux";
import { nav } from "./store/navbar_slice";
import Login from "./pages/login";

setupIonicReact();

const App = () => {
  const navbar = useSelector(nav);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* ROUTES */}
          <IonRouterOutlet>
            <Route path="/" render={() => <Redirect to="/home" />} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/messages" component={Messages} exact />
            <Route path="/profile" component={Profile} exact />
          </IonRouterOutlet>

          {!navbar && <IonTabBar></IonTabBar>}

          {/* NAVIGATION BAR */}
          {navbar && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="messages" href="/messages">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}

          {/* END NAV BAR */}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
