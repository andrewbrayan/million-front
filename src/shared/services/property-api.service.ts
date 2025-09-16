import type { SearchParams } from "@core/store/actions/search-params.actions";
import type {
  GeneralResponse,
  PaginatedResponse,
} from "@shared/interfaces/common.interfaces";
import httpAdapter from "@shared/utils/http-adapter";

export interface Property {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
  latitude: number;
  longitude: number;
  operationType: number;
}

export interface GetPropertiesContent extends PaginatedResponse {
  items: Property[];
}

export const getProperties = async (
  params: SearchParams | null
): Promise<GetPropertiesContent> => {
  const response = await httpAdapter<GeneralResponse<GetPropertiesContent>>({
    url: "/api/Properties",
    params: params,
  });
  return response.content;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await httpAdapter<GeneralResponse<Property>>({
    url: `/api/Properties/${id}`,
  });
  return response.content;
};

export const postProperty = async (property: Property): Promise<Property> => {
  const response = await httpAdapter<Property>({
    url: "/api/Properties",
    method: "POST",
    data: property,
  });
  return response;
};
