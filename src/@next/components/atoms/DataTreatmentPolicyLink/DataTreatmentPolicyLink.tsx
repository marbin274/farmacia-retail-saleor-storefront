import { DOCUMENTS_URLS_S3 } from "@temp/core/config";
import React from "react";
export const DataTreatmentPolicyLink = () => (
    <label htmlFor="" > Acepto el tratamiento para
        <a href={DOCUMENTS_URLS_S3.finesAdicionalesUrls}> Fines adicionales </a>
    (opcional )
    </label >
);
