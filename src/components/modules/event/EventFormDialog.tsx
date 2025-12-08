import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createEvent } from "@/services/host/hostedEventManagement";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IEventFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EventFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IEventFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createEvent, null);

  // Handle success/error from server
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Event created successfully");
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create Schedule</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >
          <FieldGroup>
            <div className="grid grid-cols-1  gap-4">
              <Field>
                <FieldLabel htmlFor="name">Title</FieldLabel>
                <Input id="name" name="name" type="text" />
                <InputFieldError field="name" state={state} />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input id="description" name="description" type="text" />
                <InputFieldError field="description" state={state} />
              </Field>
            </div>
          </FieldGroup>

          <div className="flex items-center justify-end gap-4 px-6 pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
