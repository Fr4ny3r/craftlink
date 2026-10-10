export default function PostSection({ modalPost, setModalPost, HandleCreatePost }: { modalPost: boolean; setModalPost: (modalPost: boolean) => void; HandleCreatePost: (title: string, desc: string) => Promise<void> }) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.defaultPrevented= true;

        const formData = new FormData(event.currentTarget);
        const title = (formData.get("title") ?? "").toString().trim();
        const desc = (formData.get("desc") ?? "").toString();

        if (!title) return;

        await HandleCreatePost(title, desc);
        setModalPost(false);
    };

    return (
        <section className="fixed w-full min-h-screen bg-black/40 backdrop-blur-[4px] backdrop-saturate-150 top-0 left-0 flex flex-col justify-center items-center gap-4">
            <main className="flex flex-col p-8 gap-4 md:w-140 rounded-md bg-gray-800/90 shadow-gray-200/15 shadow-2xl backdrop-blur-[4px] backdrop-saturate-150">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Crear Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-4 rounded-md w-full h-fit bg-white/10">
                    <div className=" md:w-4/6 flex flex-col gap-4 p-4 rounded-md w-full h-fit bg-white/4">
                        <input required name="title" type="text" placeholder="Título (OBLIGATORIO)" className="w-full p-4 rounded-md bg-white/10" />
                        <textarea name="desc" placeholder="Contenido (OPCIONAL)" className="resize-none w-full p-4 rounded-md bg-white/10 h-40"></textarea>
                    </div>
                    <div className="bg-black md:w-2/6 flex flex-col justify-center items-center gap-4 p-4 rounded-md w-full bg-white/10">
                        <label htmlFor="file-upload" className="md:text-4xl text-3xl w-full md:aspect-square p-4 rounded-md bg-white/10 cursor-pointer flex justify-center items-center">
                            +
                            <span className="ml-2 text-2xl md:hidden">Archivo</span>
                        </label>
                        <input id="file-upload" type="file" className="hidden" />
                    </div>

                    <div className="flex justify-between w-full p-4 rounded-md bg-white/10">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
                            Subir
                        </button>
                        <button onClick={() => setModalPost(false)} type="button" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
        </section>
    );
}