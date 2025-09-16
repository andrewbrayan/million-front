import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import {
  getPropertyById,
  type Property,
} from "@shared/services/property-api.service";

export type PropertyDetailLoaderData = { property: Property };

export const propertyDetailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<PropertyDetailLoaderData> => {
  const { id } = params;

  if (!id) {
    throw redirect("/list");
  }

  try {
    const property = await getPropertyById(id);

    if (!property) {
      throw redirect("/404");
    }

    return { property };
  } catch (error) {
    console.error("Error loading property:", error);
    throw redirect("/404");
  }
};
