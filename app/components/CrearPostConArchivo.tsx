import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
type Request = {
  body: any
  file?: {
    originalname: string
    buffer: any
    mimetype: string
  }
}

type Response = {
  status(code: number): Response
  json(body: any): Response
}

const prisma = new PrismaClient()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
)

export async function CrearPostConArchivo(req: Request, res: Response) {
  try {
    const { title, desc, authorId } = req.body
    const archivoLocal = req.file // El archivo que subió el usuario desde su dispositivo

    if (!archivoLocal) {
      return res.status(400).json({ error: "No se subió ningún archivo" })
    }

    // 1. Generar un nombre único para que no se sobrescriban archivos con el mismo nombre
    const fileExtension = archivoLocal.originalname.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`

    // 2. Subir el archivo local DIRECTAMENTE a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('nombre-de-tu-bucket') // El bucket que creaste en el panel de Supabase
      .upload(fileName, archivoLocal.buffer, {
        contentType: archivoLocal.mimetype,
      })

    if (uploadError) {
      throw new Error(`Error al subir a Supabase Storage: ${uploadError.message}`)
    }

    // 3. Obtener la URL pública del archivo recién subido
    const { data: publicUrlData } = supabase.storage
      .from('nombre-de-tu-bucket')
      .getPublicUrl(fileName)

    const urlDelArchivo = publicUrlData.publicUrl

    // 4. Guardar el registro en la base de datos usando Prisma
    // Aquí es donde 'content' almacena la URL del archivo local que acabas de subir a la nube
    const nuevoPost = await prisma.post.create({
      data: {
        title,
        desc,
        content: urlDelArchivo, // <--- Guardamos la URL del archivo
        authorId,
      },
    })

    return res.status(201).json({
      message: "Post y archivo creados con éxito",
      post: nuevoPost
    })

  } catch (error : any) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}