"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { IPost } from "@/types";

export function CommunityFeed() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/community/feed");
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data.posts);
      }
    } catch (err) {
      setError("피드를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-square">
            <img
              src={post.imageUrl}
              alt={`${post.userName}의 생성 이미지`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={post.userProfile}
                  alt={post.userName}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">{post.userName}</span>
              </div>
            </div>
            <div className="flex gap-4 text-gray-600">
              <button className="flex items-center gap-1 hover:text-gray-900">
                <Heart
                  className={`w-5 h-5 ${
                    post.isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-gray-900">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-gray-900 ml-auto">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
