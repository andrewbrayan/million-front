import type { GeneralResponse } from "@shared/interfaces/common.interfaces";
import type { ZodError } from "zod";

export const getGeneralResponseForm = (error: ZodError): GeneralResponse => {
  const message = error.message;

  const issues = error.issues.map((issue) => ({
    path: issue.path,
    message: issue.message,
  }));

  return {
    statusCode: 400,
    code: "INVALID_REQUEST",
    message: message,
    content: issues,
    success: false,
    timestamp: Date.now(),
  };
};
