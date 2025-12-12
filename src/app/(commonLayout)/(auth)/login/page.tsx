import LoginForm from "@/components/login-form";
import QuickLogin from "@/components/quick-login";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center items-start gap-8 py-20 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow">
        <div className="space-y-2 text-center">
          <h1 className="text-xl md:text-3xl font-medium font-primary">Welcome Back</h1>
          <p className="text-gray-500 font-secondary">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirect={params.redirect} />
      </div>

      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow">
        <h2 className="text-xl md:text-3xl font-medium font-primary text-gray-800 text-center mb-3">
          Quick Access
        </h2>
        <p className=" text-gray-600 font-secondary text-center mb-10">
          Test the application with different user roles
        </p>
        <QuickLogin />
      </div>
    </div>
  );
};

export default LoginPage;
