import { NextResponse } from "next/server";
import { IFeedResponse, IPost } from "@/types";

// 목업 데이터
const mockPosts: IPost[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  imageUrl: `https://picsum.photos/${400 + i}/400`,
  userName: `창작자${i + 1}`,
  likes: Math.floor(Math.random() * 300),
  comments: Math.floor(Math.random() * 50),
  isLiked: Math.random() > 0.5,
  prompt: `창의적인 프롬프트 ${i + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  userProfile: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const start = (page - 1) * limit;
    const end = start + limit;

    // 페이지네이션된 데이터 반환
    const response: IFeedResponse = {
      posts: mockPosts.slice(start, end),
      totalCount: mockPosts.length,
      hasMore: end < mockPosts.length,
    };

    return NextResponse.json(response);
  } catch {
    // error 파라미터를 제거하고 기본 에러 메시지 반환
    return NextResponse.json(
      {
        posts: [],
        totalCount: 0,
        hasMore: false,
        error: "피드를 불러오는데 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
