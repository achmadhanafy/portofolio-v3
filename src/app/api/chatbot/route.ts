import { NextResponse } from "next/server";
import { ChatRequestType, ChatResponseType } from "../../../types/chat.type";

export async function POST(req: Request) {
  try {
    const body: ChatRequestType = await req.json();

    // TODO: Call your AI backend here
    // Example:
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    return NextResponse.json<ChatResponseType>(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch chatbot" },
      { status: 500 }
    );
  }
}
