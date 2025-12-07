import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";


interface FieldErrorProps {
  field: string;
  state: IInputErrorState | null;
}

const InputFieldError = ({ field, state }: FieldErrorProps) => {
  const error = getInputFieldError(field, state);
  
  if (!error) return null;

  return (
    <FieldDescription className="text-red-600">
      {error}
    </FieldDescription>
  );
};

export default InputFieldError;