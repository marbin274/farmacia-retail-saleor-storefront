import React from "react";
import { DOCUMENTS_URLS_S3 } from "@temp/core/config";

export const TermsAndConditionsLink = () => (
  <label htmlFor="">
    *Estoy de acuerdo con las
    <a target="_blank" href={DOCUMENTS_URLS_S3.politicasDePrivacidadUrl}>
      {" "}
      Políticas de privacidad{" "}
    </a>{" "}
    y
    <a target="_blank" href={DOCUMENTS_URLS_S3.terminosYCondicionesUrl}>
      {" "}
      Términos y condiciones{" "}
    </a>
  </label>
);
