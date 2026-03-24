interface Props {
  description: string
  subtitle: string | null
}

export function ProductStory({ description, subtitle }: Props) {
  const paragraphs = description.split("\n\n").filter(Boolean)

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {subtitle && (
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">The Story</h2>
          <div className="space-y-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-base">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
