
import { IDistrictSelected } from "@temp/@sdk/repository";
import { DISTRICT_SELECTED_DEFAULT } from "@temp/core/config";
import { Subject } from "rxjs";

const subject = new Subject<IDistrictSelected>();
export const districtSelectedService = {
    clear: () => subject.next(),
    on: () => subject.asObservable(),
    setDistrict: (payload?: IDistrictSelected | null) => subject.next(payload || DISTRICT_SELECTED_DEFAULT),
};
