"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해 주세요");
      return;
    }

    // 실제로는 API 호출을 하겠지만, 지금은 목업 데이터를 사용하므로
    // 생성 페이지로 이동하는 것으로 대체
    router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-3xl font-bold text-center">AI 이미지 생성</h1>
        <p className="text-gray-600 text-center">
          프롬프트를 입력하고 AI가 생성한 이미지를 확인해보세요
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError("");
            }}
            placeholder="프롬프트를 입력하세요..."
            className={error ? "border-red-500" : ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <Button onClick={handleSubmit} disabled={!prompt.trim()}>
          이미지 생성하기
        </Button>
      </div>
    </div>
  );
}
