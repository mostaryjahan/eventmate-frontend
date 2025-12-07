"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { changePassword } from "@/services/auth/auth.service";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state?.success) {
      toast.success("Password changed successfully");
    }
  }, [state]);

  return (
    <div className=" py-16 mx-auto ">
      <h1 className="text-center text-2xl font-semibold mb-4">
        Change Password
      </h1>
      <form
        action={formAction}
        className="max-w-md border rounded-xl mx-auto p-8"
      >
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            <Field>
              <FieldLabel htmlFor="currentPassword">
                Current Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </Field>
            <InputFieldError field="currentPassword" state={state} />

            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </Field>
            <InputFieldError field="newPassword" state={state} />

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </Field>
            <InputFieldError field="confirmPassword" state={state} />
          </div>

          <Field className="mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Changing..." : "Change Password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ChangePassword;
