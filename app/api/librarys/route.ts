import connectDB from "@/app/models/lib/mongodb";
import { Search } from "@/app/models/Search";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    await connectDB();
    const { query } = await req.json();
    if (!query) return new Response("Query is required", { status: 400 });
    const newSearch = new Search({ query });
    await newSearch.save();
    return new Response("Search query saved successfully", { status: 201 });
  } catch (error) {
    console.error("Error saving search query:", error);
  }
}

// ✅ GET: Fetch recent search history
export async function GET() {
  try {
    await connectDB();
    const searches = await Search.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(searches);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
