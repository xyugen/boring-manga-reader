import ChapterReader from "./_components/chapter-reader";

interface PageProps {
  params: Promise<{
    id: string;
    chapter: string;
  }>;
}

export default async function ChapterReaderPage({ params }: PageProps) {
  const { id, chapter } = await params;

  return <ChapterReader mangaId={id} chapterId={chapter} />;
}
