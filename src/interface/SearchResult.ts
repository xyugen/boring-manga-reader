export default interface SearchResult {
  keyword: string;
  count: number;
  manga: [MangaSearchResult];
}

export interface MangaSearchResult {
  id: string;
  title: string;
  imgUrl: string;
  latestChapters: [{ name: string; chapter: number }];
  authors: string;
  updated: string;
  views: string;
}
