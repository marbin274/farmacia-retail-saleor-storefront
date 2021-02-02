import React from "react";
import { Footer, MainMenu, MetaConsumer ,OverlayManager} from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";

const App: React.FC = () => {
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
