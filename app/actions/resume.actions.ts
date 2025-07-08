"use server"

import client from "@/app/db"
import { redirect } from "next/navigation"
import { getCurrentUserForServer } from "@/utils/auth/getCurrenUser"


// console.log("from resume actions");
export async function createAndRedirectResume() {
  const user = await getCurrentUserForServer();
  // console.log("user from the resume action = ", user);

  if (!user) redirect("/auth/signin");
  // console.log("user from the resume server action = ", user);
  // console.log("user from the resume action = ", user);

  const resume = await client.resume.create({
    data: {
      userId: user.id,
      title: "Untitled Resume",
      content: {
        personalInfo: {},
        experience: [],
        education: [],
        skills: [],
        projects: [],
      },
    },
  })

  redirect(`/resume/${resume.id}`)
}
