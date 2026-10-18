import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[calc(100vh-10rem)] place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-extrabold tracking-[0.2em] text-brand-600 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
          This page is off the market.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
          The address may be incorrect, or the page may have moved. Return to the dashboard to
          continue managing the portfolio.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700"
          >
            <ArrowLeft className="size-4" />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-navy-900 px-4 text-sm font-semibold text-white"
          >
            <Home className="size-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
