import { Alert } from "@temp/@next/components/atoms/Alert";
import React from "react";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import { ItemsNotification } from "@temp/@next/components/atoms/ItemsNotification";
import { ModalBackground } from '@temp/@next/components/organisms/ModalBackground/ModalBackground';
import { cndUrl } from '@temp/constants';

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(true);
  const imageCoverageDistrictDesktop = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery.png`
  const imageCoverageDistrictMobile = `${cndUrl}/media/banner_coverage/home-banner-coverage-delivery-mobile.png`

  return (
    <>
      <ItemsNotification />
      <Alert />
      <ModalBackground
        imageDesktop={imageCoverageDistrictDesktop}
        imageMobile={imageCoverageDistrictMobile} 
        hide={() => { setShowModal(false) }} 
        show={showModal} 
      />
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
