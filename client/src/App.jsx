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
import { chatbox, home, person } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { useSelector } from "react-redux";
import Home from "./pages/( HOME )/home";
import Users from "./pages/( HOME )/users";
import Messages from "./pages/( MESSAGES )/messages";
import RequestsSent from "./pages/( MESSAGES )/requests_sent";
import Profile from "./pages/( PROFILE )/profile";
import Login from "./pages/( SIGN_IN )/login";
import { nav } from "./store/navbar_slice";
import "./theme/variables.css";
import ProfileMenu from "./components/menu/profile_menu";
import ChatMenu from "./components/menu/chat_menu";
import RequestsReceived from "./pages/( MESSAGES )/requests_received";

setupIonicReact();

const App = () => {
  const navbar = useSelector(nav);

  return (
    <IonApp>
      <IonReactRouter>
        {/* MENUS */}
        <ProfileMenu />
        <ChatMenu />

        <IonTabs>
          {/* ROUTES */}
          <IonRouterOutlet>
            <Route path="/" render={() => <Redirect to="/home" />} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/messages" component={Messages} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/users/:id" component={Users} />
            <Route path="/requests_sent" component={RequestsSent} />
            <Route path="/requests_received" component={RequestsReceived} />
          </IonRouterOutlet>

          {!navbar && <IonTabBar></IonTabBar>}

          {/* NAVIGATION BAR */}
          {navbar && (
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="messages" href="/messages">
                <IonIcon aria-hidden="true" icon={chatbox} />
                <IonLabel>Messages</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                <IonIcon aria-hidden="true" icon={person} />
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
