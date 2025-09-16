import axios, {
  AxiosHeaders,
  isAxiosError,
  type CreateAxiosDefaults,
} from "axios";
import Cookies from "js-cookie";
import { getEnvironment } from "@core/store/actions/environments.action";
import type { GeneralResponse } from "@shared/interfaces/common.interfaces";

const httpAdapter = async <R = GeneralResponse, E = GeneralResponse>(
  props: CreateAxiosDefaults
): Promise<R> => {
  const { baseURL, headers, method = "GET", ...rest } = props;
  const generalBaseUrl = getEnvironment("api");

  const newBaseURL = baseURL ?? generalBaseUrl;
  const newHeaders: AxiosHeaders = AxiosHeaders.from(headers as AxiosHeaders);
  const authorizationHeader = newHeaders.get("Authorization");
  const baseErrorResponse: GeneralResponse = {
    status: 500,
    statusCode: 500,
    code: "UNKNOWN_ERROR",
    success: false,
    content: null,
    message: "An unknown error occurred",
    timestamp: Date.now(),
  };

  if (!authorizationHeader) {
    const accessToken: string | undefined = Cookies.get("accessToken");
    if (accessToken) newHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const baseAxiosRequest = axios.create({
    baseURL: newBaseURL,
    headers: newHeaders,
  });

  try {
    const response = await baseAxiosRequest<R>({
      method,
      ...rest,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError<E>(error)) {
      const axiosError = error;
      const responseError = axiosError.response;
      if (responseError) {
        throw responseError.data;
      }
      throw baseErrorResponse;
    }
    throw baseErrorResponse;
  }
};

export default httpAdapter;
