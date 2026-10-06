

export default function Sidebar() {
  return (
    <div className="flex flex-col min-h-screen p-2 gap-2 w-100">
        <ul className="bg-white/20 w-full h-20 flex justify-around items-center">
            <li className="bg-blue-500 text-white max-h-10 max-w-10 p-8">perfil</li>
            <li className="bg-blue-500 text-white max-h-10 max-w-10 p-8">mensajes</li>
            <li className="bg-blue-500 text-white max-h-10 max-w-10 p-8">publicar</li>
            <li className="bg-blue-500 text-white max-h-10 max-w-10 p-8">configuración</li>
        </ul>
        <ul className="bg-white/20 w-full flex flex-col gap-2 justify-around items-center">
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">inicio</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">explorar</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">crear</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">guardados</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">historial</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">preferencias</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">ayuda</li>
            <li className="bg-blue-500 text-white max-h-10 w-full p-8">contacto</li>
        </ul>
    </div>
  );
}