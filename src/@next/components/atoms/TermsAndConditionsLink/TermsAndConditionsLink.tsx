import { DOCUMENTS_URLS_S3 } from "@temp/core/config";
import React from "react";
export const TermsAndConditionsLink = () => (
    <label htmlFor="">
        *Estoy de acuerdo con las
        <a href={DOCUMENTS_URLS_S3.politicasDePrivacidadUrl}> Políticas de privacidad </a>  y
        <a href={DOCUMENTS_URLS_S3.terminosYCondicionesUrl}> Términos y condiciones </a>
    </label>
);
