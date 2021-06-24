import { IDistrictSelected, LocalStorageItems } from "@temp/@sdk/repository";
import { DISTRICT_SELECTED_DEFAULT } from "@temp/core/config";
import React from "react";
import { districtSelectedService } from "../services/districtSelectedService";
import { useLocalStorage } from "./useLocalStorage";


export const useDistrictSelected = (): [IDistrictSelected, (value?: IDistrictSelected | null) => void] => {

    const { storedValue, setValue } = useLocalStorage<IDistrictSelected>(LocalStorageItems.DISTRICT_SELECTED, DISTRICT_SELECTED_DEFAULT);
    const { setValue: setDistrictChanged } = useLocalStorage<boolean>(LocalStorageItems.DISTRICT_CHANGED, false);

    React.useEffect(() => {
        districtSelectedService
            .on()
            .subscribe((payload: IDistrictSelected) => {
                setDistrictChanged(true);
                setValue(payload);
            });
    }, []);

    return [storedValue, districtSelectedService.setDistrict];

}
