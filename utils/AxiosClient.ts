import Axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface AxiosClientProps {
  endpoint: string;
  authToken?: string | null;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}

export const AxiosClient = async ({
  authToken,
  endpoint,
  method = "GET",
  body,
}: AxiosClientProps) => {
  try {
    const request = await Axios({
      method,
      url: `${BASE_URL}/${endpoint}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: body,
    });

    return request;
  } catch (error) {
    console.error(`Error`);
  }
};
