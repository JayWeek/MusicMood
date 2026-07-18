import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-green-400 p-16 text-center">

          <h2 className="text-5xl font-black text-black">
            Ready to Discover
            <br />
            Your Perfect Playlist?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-black/80">
            Join thousands of music lovers using AI to
            discover songs for every mood.
          </p>

          <Link
            href="/auth"
            className="mt-10 inline-block rounded-full bg-black px-10 py-4 font-semibold text-white transition hover:bg-zinc-900"
          >
            Start Free
          </Link>

        </div>

      </div>
    </section>
  );
}