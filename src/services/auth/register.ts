/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./login";

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name") || "",
      location: formData.get("location") || "",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerValidationZodSchema
    ).data;

    const registerData = {
      name: validatedPayload.name,
      location: validatedPayload.location,
      email: validatedPayload.email,
      password: validatedPayload.password,
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    const res = await serverFetch.post("/auth/register", {
      body: newFormData,
    });
    

    const result = await res.json();
    console.log(result);

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
