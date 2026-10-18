import { Skeleton } from '../ui/Feedback.jsx';

export function PropertyListSkeleton() {
  return (
    <div className="space-y-1 p-4" aria-label="Loading properties">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex items-center gap-4 rounded-xl p-3">
          <Skeleton className="h-14 w-16 shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-48 max-w-full" />
            <Skeleton className="mt-2 h-3 w-64 max-w-full" />
          </div>
          <Skeleton className="hidden h-5 w-24 sm:block" />
          <Skeleton className="hidden h-8 w-28 md:block" />
        </div>
      ))}
    </div>
  );
}
