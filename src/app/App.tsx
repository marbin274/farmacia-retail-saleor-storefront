import { Alert } from "@temp/@next/components/atoms/Alert";
import { ItemsNotification } from "@temp/@next/components/atoms/ItemsNotification";
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
  const { update } = useUpdateCartLines();
  const [, setDistrict] = useDistrictSelected();
  
  React.useEffect(() => {
    (window as any).updateCartLines = () => {
      update();
    }
    (window as any).updateDistrict = (district) => {
      setDistrict(district);
    }
  });

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
