"use server";
import { createUser } from "@/db/queries";

async function resisterUser(formData) {
  const user = Object.fromEntries(formData);
  console.log("User data:", user);

  return createUser(user);
}
export { resisterUser };
