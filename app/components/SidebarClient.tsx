"use client"

import Image from "next/image"
import { useState } from "react"
import { signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

export default function SidebarClient({ session }: { session: Session | null }) {
  const [section, setSection] = useState<"mensaje" | "contactos" | "perfil">("mensaje")

  return (
    <div className="flex flex-col items-center w-full md:w-100 md:min-h-screen">
      {session?.user ? (
        <ul className="md:text-xl flex gap-4 justify-around items-center font-bold text-white md:h-30 p-4">
          <li className="hover:bg-blue-600 cursor-pointer" onClick={() => setSection("perfil")}>
            <Image
              width={50}
              height={50}
              src={session.user.image || "/default-profile.png"}
              alt="profile"
              className="rounded-full object-cover"
            />
          </li>
          <li className="hover:bg-blue-600 cursor-pointer" onClick={() => setSection("mensaje")}>
            mensaje
          </li>
          <li className="hover:bg-blue-600 cursor-pointer" onClick={() => setSection("contactos")}>
            contactos
          </li>
            <button onClick={()=>{signOut()}} className="flex md:hidden text-sm bg-red-600 p-4 px-8 rounded-xl font-bold">Salir</button>

        </ul>
      ) : (
        <div className="relative text-white font-bold flex justify-center items-center w-fit h-30">
          <button
            type="button"
            className="bg-blue-500 cursor-pointer active:bg-blue-600 text-xl p-4 px-6 relative rounded-md"
            onClick={() => signIn("google")}
          >
            Iniciar con Google
          </button>
        </div>
      )}

      <ul className="hidden md:flex space-y-2 border-t-2  border-white/50 w-full p-2">
        {section === "mensaje" && (
          <li className="text-white text-md">Sección de Mensajes</li>
        )}
        {section === "contactos" && (
          <li className="text-white text-md">Sección de Contactos</li>
        )}
        {section === "perfil" && (
          <li className="text-white text-md">Sección de Perfil</li>
        )}
      </ul>
    </div>
  )
}