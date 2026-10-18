import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.jsx';
import { Skeleton } from './components/ui/Feedback.jsx';

const AddPropertyPage = lazy(() => import('./pages/AddPropertyPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const EditPropertyPage = lazy(() => import('./pages/EditPropertyPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage.jsx'));
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage.jsx'));
const SalesPage = lazy(() => import('./pages/SalesPage.jsx'));

function RouteFallback() {
  return (
    <div className="space-y-6" aria-label="Loading page">
      <Skeleton className="h-20 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="properties"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PropertiesPage />
            </Suspense>
          }
        />
        <Route
          path="properties/new"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AddPropertyPage />
            </Suspense>
          }
        />
        <Route
          path="properties/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PropertyDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="properties/:id/edit"
          element={
            <Suspense fallback={<RouteFallback />}>
              <EditPropertyPage />
            </Suspense>
          }
        />
        <Route
          path="sales"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SalesPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
