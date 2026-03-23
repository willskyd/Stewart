import Link from "next/link"
import { ChevronRight, FileText, ShieldCheck } from "lucide-react"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getHelpCategoryBySlug, getHelpTopic } from "@/lib/site-data"

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ category: string; topic: string }>
}) {
  const { category, topic } = await params
  const helpCategory = getHelpCategoryBySlug(category)
  const article = getHelpTopic(category, topic)

  if (!helpCategory || !article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-14">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-primary shadow-sm">
                <FileText className="h-4 w-4" />
                {helpCategory.title}
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{article.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{article.summary}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.5fr_1fr]">
            <article className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="space-y-6 text-muted-foreground">
                {article.body.map((paragraph) => (
                  <p key={paragraph} className="leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Related guidance</h2>
              </div>
              <div className="mt-6 space-y-3">
                {helpCategory.topics.map((topicItem) => (
                  <Link
                    key={topicItem.slug}
                    href={`/help/${helpCategory.slug}/${topicItem.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-border p-4 transition hover:border-primary/40"
                  >
                    <span className="text-sm text-foreground">{topicItem.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Button className="w-full rounded-full" asChild>
                  <Link href="/support">Contact support</Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
