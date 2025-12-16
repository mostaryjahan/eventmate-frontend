"use client";

import { loginUser } from "@/services/auth/login";
import { Button } from "./ui/button";
import { startTransition, useActionState } from "react";

// credentials for quick login from environment variables
const QUICK_LOGIN_CREDENTIALS = {
  ADMIN: {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD!,
  },
  HOST: {
    email: process.env.NEXT_PUBLIC_HOST_EMAIL!,
    password: process.env.NEXT_PUBLIC_HOST_PASSWORD!,
  },
  USER: {
    email: process.env.NEXT_PUBLIC_USER_EMAIL!,
    password: process.env.NEXT_PUBLIC_USER_PASSWORD!,
  },
};

const QuickLogin = () => {
  const [, formAction, isPending] = useActionState(loginUser, null);

  const handleQuickLogin = (role: keyof typeof QUICK_LOGIN_CREDENTIALS) => {
    const credentials = QUICK_LOGIN_CREDENTIALS[role];
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    startTransition(() => formAction(formData));
  };

  return (

      <div className="bg-primary/5">
        <div className="flex flex-col  justify-center mt-4 mb-4">
          <div className="space-y-6">
            {/* Admin Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
              onClick={() => handleQuickLogin("ADMIN")}
              disabled={isPending}
            >
              Login as an Admin
            </Button>

            {/* Host Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-600 transition-colors"
              onClick={() => handleQuickLogin("HOST")}
              disabled={isPending}
            >
              Login as a Host
            </Button>

            {/* User Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 border-2 border-green-200 text-green-500 hover:bg-green-50 hover:border-green-300 transition-colors"
              onClick={() => handleQuickLogin("USER")}
              disabled={isPending}
            >
              Login as a User
            </Button>
          </div>
        </div>
      </div>
  );
};

export default QuickLogin;
