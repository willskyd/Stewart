import { redirect } from "next/navigation"
import { getHelpArticleBySlug, helpCategories } from "@/lib/site-data"

export default async function HelpArticleRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getHelpArticleBySlug(slug)

  if (!article) {
    redirect("/help")
  }

  const category = helpCategories.find((item) => item.topics.some((topic) => topic.slug === slug))

  if (!category) {
    redirect("/help")
  }

  redirect(`/help/${category.slug}/${article.slug}`)
}
