"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function initiatePayment(eventId: string) {
    try {
        const response = await serverFetch.post(`/events/${eventId}/initiate-payment`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error initiating payment:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to initiate payment",
        };
    }
}

export async function getPaymentStatus(eventid: string) {
    try {
        const response = await serverFetch.get(`/payment/status/${eventid}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error fetching payment status:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch payment status",
        };
    }
}

export async function verifyPayment(sessionId: string) {
    try {
        const response = await serverFetch.get(`/payments/verify?sessionId=${sessionId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Error verifying payment:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to verify payment",
        };
    }
}