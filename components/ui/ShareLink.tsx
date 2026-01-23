"use client";

export default function SharePortfolio() {
  const portfolioUrl = "https://your-portfolio-link.com";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Portfolio",
        text: "Check out my portfolio",
        url: portfolioUrl,
      });
    } else {
      await navigator.clipboard.writeText(portfolioUrl);
      alert("Portfolio link copied to clipboard");
    }
  };

  return (
    <section className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">
        Like what you see? Share my portfolio
      </h2>

      <p className="max-w-xl mx-auto text-white/60">
        If this portfolio helped you understand my work or inspired an idea,
        feel free to share it with someone who might find it useful.
      </p>

      <button
        onClick={handleShare}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-black px-6 py-3 text-white font-medium transition hover:opacity-90"
      >
        Share Portfolio
      </button>
    </section>
  );
}
