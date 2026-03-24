import { Star } from "lucide-react"
import { reviews } from "@/lib/data/reviews"

export function ReviewsSection() {
  return (
    <section className="py-20 px-4 bg-[#141412]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            The People Have Spoken
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground">4.9 from 2,400+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex text-accent mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground italic mb-4">&ldquo;{review.quote}&rdquo;</p>
              <p className="text-sm text-muted-foreground font-medium">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
