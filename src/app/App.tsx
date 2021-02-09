import { Alert } from "@temp/@next/components/atoms/Alert";
import { useShopDetails } from "@temp/@sdk/react";
import React from "react";
import { Footer, MainMenu, MetaConsumer, OverlayContext, OverlayManager, OverlayTheme, OverlayType } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";

const App: React.FC = () => {
  const { data } = useShopDetails();
  const overlayContext = React.useContext(OverlayContext);
  React.useEffect(() => {
    if (data?.shop?.isShippingAvailable === false) {
      overlayContext.show(OverlayType.outOfTime, OverlayTheme.modal);
    }
  }, [data]);
  return (
    <>
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
