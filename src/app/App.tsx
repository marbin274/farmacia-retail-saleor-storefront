import { Alert } from "@temp/@next/components/atoms/Alert";
import React from "react";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import { ItemsNotification } from "@temp/@next/components/atoms/ItemsNotification";

const App: React.FC = () => {
  return (
    <>
      <ItemsNotification />
      <Alert />
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
