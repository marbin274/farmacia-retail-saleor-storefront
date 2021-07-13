import { primeApiUrl, primeApiKey } from "@temp/constants";
import axios from "axios";

export const checkPrimeUser = async (email: string): Promise<boolean> => {
  try {
    const url = `${primeApiUrl!}/${email}`;
    const response = await axios.get(url, {
      headers: {
        "x-api-key": primeApiKey,
      },
    });
    return response.data.is_prime_user;
  } catch {
    return false;
  }
};
