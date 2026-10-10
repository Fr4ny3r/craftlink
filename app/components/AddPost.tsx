"use client"

import { useState } from "react"
import PostSection from "./PostSection"

export default function AddPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [modalPost, setModalPost] = useState(false)

      const handleCreatePost = async (title: string, desc: string) => {
        try {
          const res = await fetch("/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              desc: desc,
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
      // <form action={async () => {
      //   await handleCreatePost()
      // }}>
        <button onClick={() => setModalPost(true)} className="bg-blue-600 flex justify-center items-center rounded-xl text-xl font-bold w-12 h-12">
          {modalPost ? <PostSection modalPost={modalPost} setModalPost={setModalPost} HandleCreatePost={handleCreatePost}/> : "+"}
        </button>
      // </form>
    )
}