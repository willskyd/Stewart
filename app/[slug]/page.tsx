import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { getGenericContentPage } from "@/lib/site-data"

export default async function GenericContentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getGenericContentPage(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-14">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex rounded-full bg-background/80 px-4 py-2 text-sm text-primary shadow-sm">
                {page.eyebrow}
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{page.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{page.summary}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
            {page.sections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
