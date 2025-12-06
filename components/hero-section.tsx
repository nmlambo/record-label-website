export function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/abstract-black-and-white-music-waves.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-balance">NEW RELEASES</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Discover the latest tracks from our roster of talented artists
        </p>
      </div>
    </section>
  )
}
