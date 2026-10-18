import {
  BarChart3,
  Bell,
  Building2,
  ChevronLeft,
  Menu,
  PlusCircle,
  ReceiptText,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import { Brand } from './Brand.jsx';

const navigation = [
  { to: '/', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/properties', label: 'Properties', icon: Building2 },
  { to: '/properties/new', label: 'Add property', icon: PlusCircle },
  { to: '/sales', label: 'Sales history', icon: ReceiptText },
];

const pageTitles = {
  '/': 'Portfolio overview',
  '/properties': 'Property management',
  '/properties/new': 'Add property',
  '/sales': 'Sales management',
};

function SidebarContent({ collapsed, onNavigate, onCollapse }) {
  return (
    <>
      <div
        className={cn(
          'flex h-20 items-center border-b border-white/8 px-5',
          collapsed && 'justify-center px-3',
        )}
      >
        <Brand compact={collapsed} />
      </div>
      <nav className="flex-1 space-y-1.5 px-3 py-6" aria-label="Main navigation">
        {!collapsed && (
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase">
            Workspace
          </p>
        )}
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition',
                collapsed && 'justify-center',
                isActive
                  ? 'bg-white/10 text-white shadow-inner shadow-white/5'
                  : 'text-slate-400 hover:bg-white/6 hover:text-white',
              )
            }
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/8 p-3">
        <button
          onClick={onCollapse}
          className={cn(
            'hidden min-h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-400 transition hover:bg-white/6 hover:text-white lg:flex',
            collapsed && 'justify-center',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={cn('size-5 transition', collapsed && 'rotate-180')} />
          {!collapsed && 'Collapse'}
        </button>
        {!collapsed && (
          <div className="mt-3 rounded-xl bg-white/5 p-3">
            <p className="text-xs font-bold text-slate-300">Portfolio workspace</p>
            <p className="mt-1 text-[11px] leading-4 text-slate-500">Fictional development data</p>
          </div>
        )}
      </div>
    </>
  );
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title =
    pageTitles[location.pathname] ||
    (location.pathname.includes('/edit') ? 'Edit property' : 'Property details');

  return (
    <div className="min-h-screen bg-transparent">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col bg-navy-950 shadow-2xl transition-[width] duration-200 lg:flex',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        <SidebarContent collapsed={collapsed} onCollapse={() => setCollapsed((value) => !value)} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <aside className="relative flex h-full w-[min(19rem,86vw)] flex-col bg-navy-950 shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-4 z-10 grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className={cn('transition-[padding] duration-200', collapsed ? 'lg:pl-20' : 'lg:pl-64')}>
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <div>
              <p className="text-xs font-semibold text-slate-400">EstateIQ workspace</p>
              <p className="mt-0.5 font-bold text-navy-950">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="relative grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="size-4.5" />
              <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-gold-500" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white py-1.5 pr-3 pl-1.5 shadow-sm">
              <span className="grid size-8 place-items-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                EI
              </span>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-800">Portfolio Admin</p>
                <p className="text-[10px] text-slate-400">Local workspace</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
