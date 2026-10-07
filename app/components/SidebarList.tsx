import { auth } from "@/src/auth"
import SidebarClient from "./SidebarClient"

export default async function SidebarList() {
  const session = await auth()
  return <SidebarClient session={session} />
}