import {
  ICreateRoute,
  IRoute,
} from '@/app/dashboard/[account_id]/(features)/routes/lib/types';
import { getCities, getOperators, getRouteById } from '../../lib/data';
import { RouteForm } from '../../components/route-form';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface EditRoutePageProps {
  params: {
    account_id: string,
    route_id: string
  };
}

export default async function EditRoutePage({ params }: EditRoutePageProps) {
  params = await params
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="p-0">
              <Link
                href={`/dashboard/${params.account_id}/routes/${params.route_id}`}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Edit Route</h1>
          </div>
          <p className="text-muted-foreground">Modify route information</p>
        </div>
      </div>

      <Suspense fallback={<RouteFormSkeleton />}>
        <EditRouteContent id={params.route_id} />
      </Suspense>
    </div>
  );
}

async function EditRouteContent({ id }: { id: string }) {
  const cities = await getCities();
  const operators = await getOperators();
  const route = await getRouteById(id) as IRoute;
  const createRoute :ICreateRoute = {
    origin: cities.filter((city) => city.name === route.origin)[0].id,
    destination: cities.filter((city) => city.name === route.destination)[0].id,
    arrival: new Date(route.arrival),
    departure: new Date(route.departure),
    operatorId: route.operator.id,
    departureStationId: route.departureStation.id,
    arrivalStationId: route.arrivalStation.id,
    transportType: route.transportType,
  }

  if (!route) {
    notFound();
  }

  return <RouteForm routeId={route.id} initialRoute={createRoute} cities={cities} operators={operators} />;
}

function RouteFormSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
