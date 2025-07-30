import SearchResult from "@/interface/SearchResult";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  const response: Response = await fetch(
    `${process.env.GOMANGA_API_URL}/search/${query}`,
    {
      method: "GET",
    }
  );

  if (response.ok) {
    const searchResult: SearchResult = await response.json();
    return NextResponse.json(searchResult);
  }

  return NextResponse.error();
};
