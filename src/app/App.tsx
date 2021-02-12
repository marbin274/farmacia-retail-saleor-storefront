import { Alert, alertService } from "@temp/@next/components/atoms/Alert";
import { useShopDetails } from "@temp/@sdk/react";
import React from "react";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import WaitTimeIcon from "images/auna/wait-time.svg";

const App: React.FC = () => {
  const { data } = useShopDetails();
  React.useEffect(() => {
    if (localStorage.getItem("new_version")) {
      alertService.sendAlert({
        buttonText: "Entendido",
        icon: WaitTimeIcon,
        message: "Una nueva actualización de Farmauna ya está disponible.",
        title: "Mejoramos para ti",
        type: "Info",
      });
      localStorage.removeItem("new_version");
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
