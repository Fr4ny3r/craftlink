import { auth, signIn, signOut } from "@/src/auth" // O la ruta donde exportaste auth, signIn y signOut

import { Session } from "../types"
import AddPost from "./AddPost"
import CargarPost from "./CargarPost"

export default async function ProfileSection() {
  const session = await auth()


  return (
    <div className="flex w-full flex-col gap-2">
      {session?.user ? (
        <>
        <div className="flex justify-between md:justify-between items-center gap-2 p-8 rounded-md w-full h-10 md:h-fit">
          <p className="flex md:hidden gap-2 items-end"><span className="font-bold text-2xl">Hola, </span> {session.user.name?.split(" ")[0].toLocaleUpperCase()}</p>
          <p className="hidden md:flex">Hola, {session.user.name}</p>
          <AddPost />
          <form className="hidden md:flex"
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button type="submit" className="hidden md:flex bg-red-600 p-4 rounded-xl text-xl font-bold">Cerrar sesión</button>
          </form>
        </div>
        <div className="text-base h-fit p-8 rounded-md w-full">
          <CargarPost />
        </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 p-4 rounded-md w-full">
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
            <p>Inicia sesión con Google para poder entrar</p>
          <button type="submit">Iniciar sesión con Google</button>
        </form>
        </div>
      )}
    </div>
  )
}