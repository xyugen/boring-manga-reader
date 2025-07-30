"use client";

import { APIRoutes } from "@/constants/api-routes";
import type MangaChapter from "@/interface/MangaChapter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ChapterReaderLoading from "./chapter-reader-loading";

interface ChapterReaderProps {
  chapterId?: string;
  mangaId?: string;
}

export default function ChapterReader({
  chapterId,
  mangaId,
}: ChapterReaderProps) {
  const [chapter, setChapter] = useState<MangaChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoading, setImageLoading] = useState<boolean[]>([]);
  const [showControls, setShowControls] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);

      const chapterData = await fetch(
        `${APIRoutes.MANGA}/${mangaId}/${chapterId}`
      ).then((res) => res.json());

      setChapter(chapterData);
      setImageLoading(new Array(chapterData.imageUrls.length).fill(true));
      setLoading(false);
    };

    fetchChapter();
  }, [chapterId, mangaId]);

  const goToNextPage = useCallback(() => {
    if (!chapter) return;
    if (currentPage < chapter.imageUrls.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, chapter]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!chapter) return;

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          goToPreviousPage();
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case " ":
          e.preventDefault();
          goToNextPage();
          break;
        case "Escape":
          router.back();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [chapter, currentPage, goToNextPage, goToPreviousPage, router]);

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  if (loading) {
    return <ChapterReaderLoading />;
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Chapter not found</h2>
          <p className="text-slate-400">
            The requested chapter could not be loaded.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div
        className={`sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title="Go back"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h1 className="font-bold text-lg">{chapter.title}</h1>
                <p className="text-slate-400 text-sm">{chapter.chapter}</p>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              {currentPage + 1} / {chapter.imageUrls.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Current Page */}
          <div className="relative mb-8">
            {imageLoading[currentPage] && (
              <div className="w-full h-96 bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
                <span className="text-slate-400">Loading...</span>
              </div>
            )}
            <div className="relative w-full">
              <Image
                src={chapter.imageUrls[currentPage] || "/placeholder.svg"}
                alt={`Page ${currentPage + 1}`}
                width={800}
                height={1200}
                className={`w-full h-auto rounded-lg shadow-2xl transition-opacity duration-300 ${
                  imageLoading[currentPage] ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => handleImageLoad(currentPage)}
                priority
              />
            </div>
          </div>

          {/* Page Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPage === 0
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
            >
              ←
            </button>

            <div className="flex items-center gap-2 max-w-xs overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 px-2">
                {chapter.imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors flex-shrink-0 ${
                      index === currentPage
                        ? "bg-blue-500"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    title={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === chapter.imageUrls.length - 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentPage === chapter.imageUrls.length - 1
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
            >
              →
            </button>
          </div>

          {/* Chapter Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-700">
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
              ← Previous Chapter
            </button>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
              Next Chapter →
            </button>
          </div>
        </div>
      </div>

      {/* Floating Navigation */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 0
                ? "text-slate-500"
                : "text-white hover:bg-slate-700"
            }`}
          >
            <span className="text-lg">←</span>
          </button>

          <span className="text-sm font-medium min-w-[60px] text-center">
            {currentPage + 1} / {chapter.imageUrls.length}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === chapter.imageUrls.length - 1}
            className={`p-2 rounded-full transition-colors ${
              currentPage === chapter.imageUrls.length - 1
                ? "text-slate-500"
                : "text-white hover:bg-slate-700"
            }`}
          >
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Click Areas for Navigation */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="flex h-full">
          <div
            className="w-1/3 h-full pointer-events-auto cursor-pointer"
            onClick={goToPreviousPage}
          />
          <div className="w-1/3 h-full" />
          <div
            className="w-1/3 h-full pointer-events-auto cursor-pointer"
            onClick={goToNextPage}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div
        className={`fixed top-20 right-4 z-40 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 text-sm transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-slate-300 space-y-1">
          <div>
            <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">←/A</kbd>{" "}
            Previous
          </div>
          <div>
            <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">
              →/D/Space
            </kbd>{" "}
            Next
          </div>
          <div>
            <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">Esc</kbd>{" "}
            Back
          </div>
        </div>
      </div>
    </div>
  );
}
