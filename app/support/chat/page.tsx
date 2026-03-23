import Link from "next/link"
import { Mail, MessageCircle, Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

const chatChannels = [
  {
    title: "Live chat queue",
    description: "Fastest route for booking, refund, and active travel issues.",
    actionLabel: "Open support page",
    href: "/support",
  },
  {
    title: "Call support",
    description: "Use phone support for urgent travel, safety, or same-day disruption cases.",
    actionLabel: "Call now",
    href: "tel:+2348001234567",
  },
  {
    title: "Email support",
    description: "Best for documentation-heavy questions that need screenshots or booking references.",
    actionLabel: "Send email",
    href: "mailto:support@stewart.com?subject=Stewart%20Support%20Request",
  },
]

export default function SupportChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-secondary/30">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-foreground md:text-5xl">Customer chat and support</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose the channel that fits the issue best. All options below are active and routed to a real action.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {chatChannels.map((channel, index) => {
              const Icon = index === 0 ? MessageCircle : index === 1 ? Phone : Mail

              return (
                <div key={channel.title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-foreground">{channel.title}</h2>
                  <p className="mt-3 text-muted-foreground">{channel.description}</p>
                  <Button className="mt-6 w-full rounded-full" asChild>
                    {channel.href.startsWith("/") ? (
                      <Link href={channel.href}>{channel.actionLabel}</Link>
                    ) : (
                      <a href={channel.href}>{channel.actionLabel}</a>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
