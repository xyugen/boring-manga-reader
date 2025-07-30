import MangaDetails from "@/interface/MangaDetails";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const response: Response = await fetch(
    `${process.env.GOMANGA_API_URL}/manga/${id}`,
    {
      method: "GET",
    }
  );

  if (response.ok) {
    const searchResult: MangaDetails = await response.json();
    return NextResponse.json(searchResult);
  }

  console.log(response);

  return NextResponse.error();
}