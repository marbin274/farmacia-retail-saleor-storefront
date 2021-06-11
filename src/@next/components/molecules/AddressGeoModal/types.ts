import { IDistrictSelected } from "@temp/@sdk/repository";

export interface IAddressGeoModalService{
    show: boolean;
    districtSelected: IDistrictSelected | null;
}
