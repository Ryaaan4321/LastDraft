import { createAndRedirectResume } from "@/app/actions/resume.actions"
import { Button } from "@/components/ui/button"

export default async function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form action={createAndRedirectResume}>
        <Button variant="outline" className="bg-[#FA6600] text-white">
          Create New Resume
        </Button>
      </form>
    </div>
  )
}
