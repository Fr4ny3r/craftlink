import { NextResponse } from "next/server"
import { auth } from "@/src/auth"
import type { Session } from "next-auth"
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado. Debes iniciar sesión." },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (title, content)" },
        { status: 400 }
      )
    }

    const newPost = await prisma.post.create({
      data: {
        title : body.title,
        content: body.content,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error al crear el post:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}


export async function GET() {
    let prism = prisma;

  try {
    const posts = await prism.$transaction(async (tx : any) => {
      
      const post = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
      });
      const authorIds = post.map((p : any) => p.authorId);
      const authors = await prisma.user.findMany({
        where: { id: { in: authorIds } },
        select: { id: true, name: true },
      });
      return post.map((p : any) => ({
        ...p,
        author: authors.find((a : any) => a.id === p.authorId)
      }));
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error("Error en GET /api/post:", error);
    
    return NextResponse.json(
      { 
        error: "Error al obtener los posts", 
        details: error.message || "Error desconocido" 
      }, 
      { status: 500 }
    );
  }
}