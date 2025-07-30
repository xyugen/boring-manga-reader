"use client";

import Input from "@/components/input";
import MangaResult from "@/components/manga-result";
import { APIRoutes } from "@/constants/api-routes";
import SearchResult, { MangaSearchResult } from "@/interface/SearchResult";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setSearchResult(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSearchResult(query);
    }, 300); // 300ms debounce
  }, [query]);

  const fetchSearchResult = async (q: string) => {
    // Cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${APIRoutes.SEARCH}?q=${q}`, {
        method: "GET",
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const result: SearchResult = await res.json();
      setSearchResult(result);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError("Something went wrong.");
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onResultClick = (id: string) => {
    router.push(`/read/${id}`);
  };

  const sort = (m1: MangaSearchResult, m2: MangaSearchResult) => {
    return (
      parseInt(m2.views.replaceAll(",", "")) -
      parseInt(m1.views.replaceAll(",", ""))
    );
  };

  return (
    <div className="font-sans flex justify-center items-center">
      <main className="p-4 w-full max-w-xl">
        <h1 className="text-center text-3xl font-bold">Boring Manga Reader</h1>

        <Input
          type="text"
          className="mt-4 w-full"
          placeholder="Search manga"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        {loading && <p className="text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="overflow-y-scroll">
          {searchResult &&
            searchResult.manga
              .sort(sort)
              .map((manga) => (
                <MangaResult
                  key={manga.id}
                  manga={manga}
                  onClick={onResultClick}
                />
              ))}
        </div>
      </main>
    </div>
  );
}
