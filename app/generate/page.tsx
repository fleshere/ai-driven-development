"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IGenerateResponse } from "@/types";

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const router = useRouter();
  const [generatedImage, setGeneratedImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!prompt) {
      router.push("/");
      return;
    }

    generateImage();
  }, [prompt, router]);

  const generateImage = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data: IGenerateResponse = await response.json();

      if (!data.success || !data.imageUrl) {
        throw new Error(data.error?.message || "이미지 생성에 실패했습니다.");
      }

      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "이미지 생성에 실패했습니다."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">이미지 생성 결과</h1>
            <p className="text-gray-600">프롬프트: {prompt}</p>
          </div>

          <div className="relative aspect-square mb-6 bg-gray-100 rounded-lg overflow-hidden">
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : (
              <img
                src={generatedImage}
                alt="생성된 이미지"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" disabled={isGenerating || !!error}>
              <Share2 className="w-4 h-4 mr-2" />
              커뮤니티에 공유
            </Button>
            <Button variant="outline" disabled={isGenerating || !!error}>
              <Download className="w-4 h-4 mr-2" />
              다운로드
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
