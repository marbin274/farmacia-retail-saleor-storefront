import { Subject } from "rxjs";

const subject = new Subject<string>();
export const searchProductsService = {
    hide: () => subject.next(),
    on: () => subject.asObservable(),
    setSearch: (payload: string) => subject.next(payload),
}
