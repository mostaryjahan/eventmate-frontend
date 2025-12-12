/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  createEvent,
  updateHostedEvent,
} from "@/services/host/hostedEventManagement";
import { getAllTypes } from "@/services/admin/eventTypeManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { IEvent } from "@/types/event.interface";
import { useRouter } from "next/navigation";

interface IEventFormProps {
  event?: IEvent;
}

const EventForm = ({ event }: IEventFormProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [eventTypes, setEventTypes] = useState<{ id: string; name: string }[]>(
    []
  );
  const isEditMode = !!event;
 const [typeId, setTypeId] = useState(event?.type?.id || "");


  const formActionFn = isEditMode
    ? async (prevState: any, formData: FormData) => {
        if (!event?.id)
          return { success: false, message: "Event ID is missing for update." };
        return updateHostedEvent(event.id, formData);
      }
    : createEvent;

  const [state, formAction, isPending] = useActionState(formActionFn, null);

  useEffect(() => {
    const fetchTypes = async () => {
      const result = await getAllTypes();
      if (result?.data) setEventTypes(result.data);
    };
    fetchTypes();
  }, []);

  // useEffect(() => {
  //   setTypeId(initialTypeId);
  // }, [initialTypeId]);

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state.message ||
          (isEditMode
            ? "Event updated successfully"
            : "Event created successfully")
      );
      router.push("/host/dashboard/hosted-events");
    } else if (state?.success === false) {
      const errorMsg =
        state.errors && typeof state.errors === "object"
          ? Object.values(state.errors).flat().join(", ")
          : state.message ||
            (isEditMode ? "Failed to update event" : "Failed to create event");
      toast.error(errorMsg);
    }
  }, [state, router, isEditMode]);

  return (
    <section className=" p-6 font-secondary bg-linear-to-r from-[#f8ebed] to-[#f8e6ef] py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 ">
          <h1 className="text-3xl font-medium font-primary">
            {isEditMode ? "Edit Event" : "Create New Event"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditMode
              ? "Update your event details"
              : "Fill in the details to create your event"}
          </p>
        </div>

        <form
          ref={formRef}
          action={formAction}
          className="space-y-2 border p-6 rounded-md shadow-md mb-16 bg-white"
          onSubmit={(e) => {
            if (!typeId) {
              e.preventDefault();
              toast.error("Please select an event type");
              return;
            }

            // Ensure all required fields are present
            const formData = new FormData(e.currentTarget);
            if (!formData.get("typeId")) {
              formData.set("typeId", typeId);
            }
          }}
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="name">Event Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={event?.name}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="typeId">Event Type</FieldLabel>
              <Select value={typeId} onValueChange={setTypeId}>
                <SelectTrigger className="w-full" id="typeId">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {typeId && <input type="hidden" name="typeId" value={typeId} />}
              <InputFieldError field="typeId" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="dateTime">Date & Time</FieldLabel>
              <Input
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                required
                defaultValue={
                  event
                    ? new Date(event.dateTime).toISOString().slice(0, 16)
                    : ""
                }
              />
              <InputFieldError field="dateTime" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                required
                defaultValue={event?.location}
              />
              <InputFieldError field="location" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="minParticipants">
                Min Participants
              </FieldLabel>
              <Input
                id="minParticipants"
                name="minParticipants"
                type="number"
                required
                defaultValue={event?.minParticipants}
              />
              <InputFieldError field="minParticipants" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="maxParticipants">
                Max Participants
              </FieldLabel>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                required
                defaultValue={event?.maxParticipants}
              />
              <InputFieldError field="maxParticipants" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="joiningFee">Joining Fee ($)</FieldLabel>
              <Input
                id="joiningFee"
                name="joiningFee"
                type="number"
                step="0.01"
                required
                defaultValue={event?.joiningFee}
              />
              <InputFieldError field="joiningFee" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Event Image</FieldLabel>
              <Input id="image" name="image" type="file" accept="image/*" />
              <InputFieldError field="image" state={state} />
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="description"
              required
              rows={4}
              defaultValue={event?.description}
            />
            <InputFieldError field="description" state={state} />
          </Field>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EventForm;
