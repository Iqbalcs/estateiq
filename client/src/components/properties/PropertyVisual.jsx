import { Building2, Building, Home, Map } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const visuals = {
  House: { icon: Home, gradient: 'from-[#0f5270] via-[#176b87] to-[#5aa8b8]' },
  Apartment: { icon: Building2, gradient: 'from-[#233d6b] via-[#405e8f] to-[#8aa0c1]' },
  Commercial: { icon: Building, gradient: 'from-[#5b3a1f] via-[#a16d34] to-[#d5ad6f]' },
  Plot: { icon: Map, gradient: 'from-[#2d5a47] via-[#4d816a] to-[#91b29e]' },
};

export function PropertyVisual({ type, city, className }) {
  const visual = visuals[type] || visuals.House;
  const Icon = visual.icon;
  return (
    <div
      className={cn(
        'relative isolate flex min-h-32 overflow-hidden bg-gradient-to-br p-4 text-white',
        visual.gradient,
        className,
      )}
    >
      <div className="absolute -top-8 -right-8 size-32 rounded-full border border-white/15" />
      <div className="absolute right-9 -bottom-10 size-28 rotate-45 rounded-3xl bg-white/10" />
      <div className="relative mt-auto flex w-full items-end justify-between gap-3">
        <span className="text-xs font-semibold tracking-wide text-white/85 uppercase">{city}</span>
        <span className="grid size-11 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
