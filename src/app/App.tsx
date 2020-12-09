import "../globalStyles/scss/index.scss";

import React from "react";

import {Footer, MainMenu, MetaConsumer, OverlayContext, OverlayManager, OverlayTheme, OverlayType} from "../components";
import { Routes } from "./routes";

const App: React.FC = () => {
  // show once 'website under construction' popup
  const overlayContext = React.useContext(OverlayContext);
  React.useEffect(() => {
    overlayContext.show(OverlayType.underConstruction, OverlayTheme.modal);
  }, []);

  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu />
      </header>
      <Routes />
      <Footer />
      <OverlayManager />
    </>
  );
};

export default App;
