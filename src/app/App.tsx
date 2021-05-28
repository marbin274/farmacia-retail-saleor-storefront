import { Alert } from "@temp/@next/components/atoms/Alert";
import { ItemsNotification } from "@temp/@next/components/atoms/ItemsNotification";
import { AddressGeoModal } from "@temp/@next/components/molecules/AddressGeoModal/AddressGeoModal";
import { useDistrictSelected } from "@temp/@next/hooks/useDistrictSelected";
import { useUpdateCartLines } from "@temp/@next/hooks/useUpdateCartLines";
import es from "date-fns/locale/es";
import React from "react";
import { registerLocale } from "react-datepicker";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";

registerLocale("es", es)

const App: React.FC = () => {
  const { update: updateCartLines } = useUpdateCartLines();
  const [district, setDistrict] = useDistrictSelected();
  
  React.useEffect(() => {
    (window as any).updateCartLines = () => {
      updateCartLines();
    }
    (window as any).updateDistrict = (district) => {
      setDistrict(district);
    }
  });

  React.useEffect(() => {
    if (district) {
      updateCartLines();
    }
  }, [district]);


  return (
    <>
      <ItemsNotification />
      <Alert />
      <AddressGeoModal />
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
