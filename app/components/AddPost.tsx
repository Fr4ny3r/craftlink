"use client"
export default function AddPost() {
      const handleCreatePost = async () => {
        try {
          const res = await fetch("/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "Mi título",
              content: "Mi contenido",
            }),
          })
    
          if (!res.ok) throw new Error("Error en la petición")
          const data = await res.json()
          console.log("Post creado:", data)
        } catch (error) {
          console.error(error)
        }
      } 
    return (
      <form action={async () => {
        await handleCreatePost()
      }}>
        <button type="submit" className="bg-blue-600 flex justify-center items-center rounded-xl text-xl font-bold w-12 h-12">+</button>
      </form>
    )
}