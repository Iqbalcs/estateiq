import { Panel } from '../ui/Panel.jsx';
import { Skeleton } from '../ui/Feedback.jsx';

export function DashboardSkeleton() {
  return (
    <div className="mt-6 space-y-6" aria-label="Loading dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <Panel className="p-5" key={index}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-4 h-8 w-32" />
            <Skeleton className="mt-3 h-3 w-20" />
          </Panel>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <Panel className="p-6">
          <Skeleton className="h-80 w-full" />
        </Panel>
        <Panel className="p-6">
          <Skeleton className="h-80 w-full" />
        </Panel>
      </div>
    </div>
  );
}
