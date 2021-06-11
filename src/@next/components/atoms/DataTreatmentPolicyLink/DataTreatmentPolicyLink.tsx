import React from "react";
import { DOCUMENTS_URLS_S3 } from "@temp/core/config";

export const DataTreatmentPolicyLink = () => (
  <label htmlFor="">
    {" "}
    Acepto el tratamiento para
    <a target="_blank" href={DOCUMENTS_URLS_S3.finesAdicionalesUrls}>
      {" "}
      Fines adicionales{" "}
    </a>
  </label>
);
