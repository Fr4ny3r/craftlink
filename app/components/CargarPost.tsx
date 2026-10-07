"use client"

import { useState, useEffect } from "react"
import { Post } from "../types"

export default function CargarPost() {
    const [Posts, setPosts] = useState<Post[]>([])
    const handleCargarPost = async () => {
        try {
            const res = await fetch("/api/post", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data: Post[] = await res.json()
            console.log("Posts cargados:", data)
            setPosts(data)
        } catch (error) {
          console.error(error)
        }
    }
    useEffect(() => {
        handleCargarPost()
    }, [])
    return (
        <div className="flex flex-col gap-2">
            {Posts.map((post) => (
                <div key={post.id} className="flex flex-col gap-2 p-4 rounded-md w-full h-fit bg-white/10">
                    <div className="flex justify-between items-center gap-2">
                        <h2 className="font-bold text-lg">{post.title}</h2>
                        <p className="text-sm text-gray-500">{post.author?.name}</p>
                    </div>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}
