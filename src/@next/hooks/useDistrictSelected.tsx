import { ISelecValue, LocalStorageItems } from "@temp/@sdk/repository";
import { DISTRICT_SELECTED_DEFAULT } from "@temp/core/config";
import React from "react";
import { districtSelectedService } from "../services/districtSelectedService";
import { useLocalStorage } from "./useLocalStorage";


export const useDistrictSelected = (): [ISelecValue, (value: ISelecValue) => void] => {

    const { storedValue, setValue } = useLocalStorage<ISelecValue>(LocalStorageItems.DISTRICT_SELECTED, DISTRICT_SELECTED_DEFAULT);

    React.useEffect(() => {
        districtSelectedService
            .on()
            .subscribe((payload: ISelecValue) => {
                setValue(payload);
            });
    }, []);

    return [storedValue, districtSelectedService.setDistrict];

}
