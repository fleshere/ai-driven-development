// 이미지 생성 관련 타입
export interface IGenerateRequest {
  prompt: string;
  styleOptions?: {
    artStyle?: string;
    colorTone?: string;
  };
}

export interface IGenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: {
    code: string;
    message: string;
  };
}

// 커뮤니티 피드 관련 타입
export interface IPost {
  id: string;
  imageUrl: string;
  userName: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  prompt?: string;
  createdAt?: string;
  userProfile?: string;
}

export interface IFeedResponse {
  posts: IPost[];
  totalCount: number;
  hasMore: boolean;
}

// 댓글 관련 타입
export interface IComment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  userProfile?: string;
}

export interface ICommentResponse {
  comments: IComment[];
  totalCount: number;
  hasMore: boolean;
}
