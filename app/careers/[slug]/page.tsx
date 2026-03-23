import Link from "next/link"
import { Briefcase, CheckCircle2, MapPin, Sparkles } from "lucide-react"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getCareerBySlug } from "@/lib/site-data"

export default async function CareerDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const position = getCareerBySlug(slug)

  if (!position) {
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
                <Briefcase className="h-4 w-4" />
                {position.department}
              </div>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">{position.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {position.location}
                </span>
                <span className="rounded-full bg-card px-4 py-2">{position.type}</span>
                {position.remote && <span className="rounded-full bg-card px-4 py-2">Remote OK</span>}
              </div>
              <p className="mt-6 text-lg text-muted-foreground">{position.summary}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">Responsibilities</h2>
              <div className="mt-6 space-y-4">
                {position.responsibilities.map((item) => (
                  <div key={item} className="rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>

              <h2 className="mt-10 text-2xl font-semibold text-foreground">Requirements</h2>
              <div className="mt-6 space-y-4">
                {position.requirements.map((item) => (
                  <div key={item} className="rounded-2xl border border-border p-4 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Why join Stewart</h2>
              </div>
              <div className="mt-6 space-y-4">
                {position.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {benefit}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild className="rounded-full">
                  <Link href="mailto:careers@stewart.com?subject=Application%20for%20role">Apply by email</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full">
                  <Link href="/careers">Back to careers</Link>
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
