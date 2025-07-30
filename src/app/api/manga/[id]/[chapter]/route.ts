import { MangaChapters } from "@/interface/MangaDetails";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; chapter: string }> }
) => {
  const { id, chapter } = await params;

  const response: Response = await fetch(
    `${process.env.GOMANGA_API_URL}/manga/${id}/${chapter}`,
    {
      method: "GET",
    }
  );

  if (response.ok) {
    const searchResult: MangaChapters = await response.json();
    return NextResponse.json(searchResult);
  }

  console.log(response);
};
