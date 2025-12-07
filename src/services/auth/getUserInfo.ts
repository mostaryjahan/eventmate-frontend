/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";

export const getUserInfo = async (): Promise<UserInfo | null> => {

    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            return null;
        }

        const verifiedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

        if (!verifiedToken) {
            return null;
        }

        // Fetch full user data from backend
        try {
            const response = await serverFetch.get(`/users/${verifiedToken.id}`);
            const result = await response.json();

            if (result?.success && result?.data) {
                const { ...userInfo } = result.data;
                return userInfo as UserInfo;
            }
        } catch (err) {
            console.log("Failed to fetch user from DB:", err);
        }

        // Fallback to token data
        const userInfo: UserInfo = {
            id: verifiedToken.id,
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email,
            role: verifiedToken.role,
        };

        return userInfo;
    } catch (error: any) {
        console.log(error);
        return null;
    }

}