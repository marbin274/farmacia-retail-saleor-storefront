import { ISelecValue } from "@temp/@sdk/repository";

export interface IAddressGeoModalService{
    show: boolean;
    districtSelected: ISelecValue | null;
}
