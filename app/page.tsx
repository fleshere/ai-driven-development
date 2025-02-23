import { PromptInput } from '@/components/PromptInput'
import { CommunityFeed } from '@/components/CommunityFeed'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      {/* 프롬프트 입력 섹션 */}
      <section className="w-full mb-12">
        <PromptInput />
      </section>

      {/* 커뮤니티 피드 섹션 */}
      <section className="w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">커뮤니티 피드</h2>
        <CommunityFeed />
      </section>
    </main>
  )
}
