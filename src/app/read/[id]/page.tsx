import MangaDetails from "./_components/manga-details";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <MangaDetails mangaId={id} />;
};

export default Page;
