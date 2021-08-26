export interface IAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  latitude?: string | number | null;
  longitude?: string | number | null;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string;
  country?: {
    code?: string;
    country?: string;
  };
  alias?: string;
}
