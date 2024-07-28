'use server';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export async function sync(origin: string) {
    const { userId } = auth()

    if (userId) {
        const dbUser = await db.user.findFirst({
            where: {
                id: userId
            }
        })


        if (!dbUser) {
            redirect(`/auth-callback?origin=${origin}`);
        }
    }

}