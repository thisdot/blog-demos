"use server";

import { revalidatePath } from "next/cache";

export async function incrementCounterAction() {
  // Call API/database to increment counter value

  // Revalidate the path to purge the caches and re-fetch the data
  revalidatePath("/storing-state-on-server");
}
