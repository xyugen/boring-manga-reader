import { MangaSearchResult } from "@/interface/SearchResult";
import moment from "moment";
import Image from "next/image";

interface MangaResultProps {
  onClick?: (id: string) => void;
  manga: MangaSearchResult;
}

const MangaResult = ({ onClick, manga }: MangaResultProps) => {
  const updated = moment(manga.updated).format("DD/MM/YYYY");

  return (
    <div
      className="overflow-hidden flex gap-2 mt-4 bg-slate-800 shadow rounded-xl hover:cursor-pointer hover:bg-slate-700/50 hover:shadow-2xl transition duration-150"
      onClick={() => onClick && onClick(manga.id)}
    >
      <Image
        src={manga.imgUrl!}
        alt={manga.title!}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        placeholder="blur"
        className="w-32 h-48 object-cover"
        width={100}
        height={100}
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">{manga.title}</h2>
        <p className="text-sm text-gray-500">{manga.authors}</p>
        <p className="text-gray-500">
          Chapters: {manga.latestChapters[0].chapter}
        </p>
        <p className="text-gray-500">Updated: {updated}</p>
        <p className="text-gray-500">Views: {manga.views}</p>
      </div>
    </div>
  );
};

export default MangaResult;
