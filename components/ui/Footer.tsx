export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-white/10 bg-[#a0a0] py-6">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm text-neutral-500">
          © {year} <span className="font-medium text-neutral-700">Travisken</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
