export default interface MangaDetails {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  status: string;
  lastUpdated: string;
  views: string;
  genres: string[];
  rating: string;
  chapters: MangaChapters[];
}

export interface MangaChapters {
  chapterId: string;
  views: string;
  uploaded: string;
  timestamp: string;
}
