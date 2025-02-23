import { NextResponse } from "next/server";
import { IGenerateRequest, IGenerateResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const body: IGenerateRequest = await request.json();

    // 실제 API 호출 대신 2초 후에 목업 응답을 반환
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 목업 응답
    const response: IGenerateResponse = {
      success: true,
      imageUrl: "https://picsum.photos/800/800",
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "GENERATION_FAILED",
          message: "이미지 생성에 실패했습니다.",
        },
      },
      { status: 500 }
    );
  }
}
