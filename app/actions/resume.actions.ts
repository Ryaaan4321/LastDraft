"use server"

import client from "@/app/db"
import { redirect } from "next/navigation"
import { getCurrentUserForServer } from "@/utils/auth/getCurrenUser"


export async function createAndRedirectResume() {
  const user = await getCurrentUserForServer();

  if (!user) redirect("/auth/signin");

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
