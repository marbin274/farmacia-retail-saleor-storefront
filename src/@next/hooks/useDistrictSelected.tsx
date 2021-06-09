import { IDistrictSelected, LocalStorageItems } from "@temp/@sdk/repository";
import { DISTRICT_SELECTED_DEFAULT } from "@temp/core/config";
import React from "react";
import { districtSelectedService } from "../services/districtSelectedService";
import { useLocalStorage } from "./useLocalStorage";


export const useDistrictSelected = (): [IDistrictSelected, (value?: IDistrictSelected | null) => void] => {

    const { storedValue, setValue } = useLocalStorage<IDistrictSelected>(LocalStorageItems.DISTRICT_SELECTED, DISTRICT_SELECTED_DEFAULT);

    React.useEffect(() => {
        districtSelectedService
            .on()
            .subscribe((payload: IDistrictSelected) => {
                setValue(payload);
            });
    }, []);

    return [storedValue, districtSelectedService.setDistrict];

}
