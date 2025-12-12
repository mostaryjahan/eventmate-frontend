import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 py-20">
        <div className="w-full max-w-xl">
          <Card className="p-4 py-4">
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-primary font-medium text-center mt-4">Create an account</CardTitle>
              <CardDescription className="text-gray-500 font-secondary text-center">
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;