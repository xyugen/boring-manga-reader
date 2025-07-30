"use client";

import { APIRoutes } from "@/constants/api-routes";
import type MangaDetails from "@/interface/MangaDetails";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import MangaDetailsLoading from "./manga-details-loading";
import { useRouter } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

interface MangaDetailsProps {
  mangaId?: string;
}

export default function MangaDetailsComponent({ mangaId }: MangaDetailsProps) {
  const router = useRouter();
  const [manga, setManga] = useState<MangaDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      setLoading(true);

      const mangaData = await fetch(`${APIRoutes.MANGA}?id=${mangaId}`).then(
        (res) => res.json()
      );

      setManga(mangaData);
      setLoading(false);
    };

    fetchMangaDetails();
  }, [mangaId]);

  const handleGoHome = () => {
    router.push(PageRoutes.HOME);
  };

  if (loading) {
    return <MangaDetailsLoading />;
  }

  if (!manga) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Manga not found</h2>
          <p className="text-slate-400">
            The requested manga could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-600 hover:bg-green-700";
      case "ongoing":
        return "bg-blue-600 hover:bg-blue-700";
      case "hiatus":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "cancelled":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Manga Cover */}
          <div className="lg:col-span-1">
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={manga.imageUrl || "/placeholder.svg"}
                alt={manga.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Manga Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                {manga.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">👤</span>
                  <span className="font-medium">Author:</span>
                  <span>{manga.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📚</span>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(
                      manga.status
                    )}`}
                  >
                    {manga.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📅</span>
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {moment(manga.lastUpdated).format("MMM DD, YYYY")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">👁️</span>
                  <span className="font-medium">Views:</span>
                  <span>{manga.views}</span>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {manga.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-full text-sm font-medium transition-colors cursor-pointer"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-2xl">⭐</span>
                <span className="text-2xl font-bold text-white">
                  {manga.rating}
                </span>
                <span className="text-slate-400">/10</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <span>📖</span>
                Read First Chapter
              </button>
              <button
                onClick={handleGoHome}
                className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent font-medium rounded-lg transition-colors"
              >
                <span>🏠</span>
                Go Home
              </button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-700 mb-8"></div>

        {/* Chapters Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl text-white flex items-center gap-2 font-bold">
              <span>📚</span>
              Chapters ({manga.chapters.at(0)?.chapterId})
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              {manga.chapters.map((chapter) => (
                <div
                  key={chapter.chapterId}
                  className="flex items-center justify-between p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center text-sm font-bold">
                      {chapter.chapterId}
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        Chapter {chapter.chapterId}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <span>👁️</span>
                          <span>{chapter.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🕒</span>
                          <span>{chapter.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-slate-400">
                    <div>
                      {moment(chapter.timestamp).format("MMM DD, YYYY")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
