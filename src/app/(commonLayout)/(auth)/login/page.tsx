import LoginForm from "@/components/login-form";
import QuickLogin from "@/components/quick-login";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="flex min-h-screen items-start justify-center gap-8 mt-20">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirect={params.redirect} />
      </div>

      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-3">
          Quick Access
        </h2>
        <p className=" text-gray-600 text-center mb-10">
          Test the application with different user roles
        </p>
        <QuickLogin />
      </div>
    </div>
  );
};

export default LoginPage;
