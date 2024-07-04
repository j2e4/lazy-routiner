import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import RoutineTabs from 'src/app/routine/routine-tabs';
import { getRoutineTabs } from 'src/services/server-state/routine-tabs';

async function RoutinePage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ['routine_tabs'],
    queryFn: getRoutineTabs,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutineTabs />
    </HydrationBoundary>
  );
}

export default RoutinePage;
