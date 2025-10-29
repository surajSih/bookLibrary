// import connectDB from "@/app/lib/mongodb";
// import { Search } from "@/app/models/Search";
// import { NextResponse } from "next/server";
// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const { query } = await req.json();
//     if (!query) return new Response("Query is required", { status: 400 });
//     const newSearch = new Search({ query });
//     await newSearch.save();
//     return new Response("Search query saved successfully", { status: 201 });
//   } catch (error: any) {
//     console.error("Error saving search query:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ GET: Fetch recent search history
// export async function GET() {
//   try {
//     await connectDB();
//     const searches = await Search.find().sort({ createdAt: -1 }).limit(10);
//     return NextResponse.json(searches);
//   } catch (error) {
//     console.error("GET Error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { Search } from "@/app/models/Search";

export async function POST(req: Request) {
  try {
    console.log("📩 Received POST request");
    await connectDB();

    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const newSearch = new Search({ query });
    await newSearch.save();

    console.log("✅ Saved search:", query);
    return NextResponse.json(
      { message: "Search saved successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST Error:", error.message || error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("📡 GET /api/librarys called");
    await connectDB();

    const searches = await Search.find().sort({ createdAt: -1 }).limit(10);
    console.log("✅ Found searches:", searches.length);
    return NextResponse.json(searches);
  } catch (error: any) {
    console.error("❌ GET Error:", error.message || error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
