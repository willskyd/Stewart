import Link from "next/link"
import { ChevronRight, Clock3, Headphones, ShieldCheck } from "lucide-react"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getSupportCategoryBySlug } from "@/lib/site-data"

export default async function SupportCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getSupportCategoryBySlug(slug)

  if (!category) {
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
                <Headphones className="h-4 w-4" />
                Specialized support
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{category.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{category.overview}</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                {category.responseTime}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">What this support desk handles</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {category.sections.map((section) => (
                  <div key={section} className="rounded-2xl bg-secondary/50 p-4 text-sm text-foreground">
                    {section}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Before you contact us</h2>
              </div>
              <div className="mt-6 space-y-4">
                {category.nextSteps.map((step) => (
                  <div key={step} className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                    {step}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/support/chat">Start live chat</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/support">Back to support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">Need a different route?</h2>
              <p className="mt-2 text-muted-foreground">
                Visit the Help Center for articles, policies, and guided answers, or use the support page for contact options.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href="/help">
                    Help Center
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/support">Support Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
