"use server";
import EmailTemplate from "@/components/payments/EmailTemplate";
import { updateGoing } from "@/db/queries";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateInterest,
} from "@/db/queries";
import { redirect } from "next/navigation";

async function resisterUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}
async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}
async function addGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}
async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "noreply@noreply.rian.io",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
}

export {
  addGoingEvent,
  addInterestedEvent,
  performLogin,
  resisterUser,
  sendEmail,
};
