'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, 클라이언트에서 바로 refetch하는 걸 막기 위해 default보다 높게 (default: 0)
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;
function getQueryClient() {
  // 서버일 때는 항상 새로 만든다.
  // 서로 다른 유저, 요청이 데이터를 공유하지 않도록
  if (isServer) return makeQueryClient();
  else if (browserQueryClient === undefined) {
    // 갖고 있는 게 없다면 새로 만든다.
    // suspense boundary가 있다면 이 작업은 필요 없을 수 있다.
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export default function Providers({ children }: React.PropsWithChildren) {
  // suspense boundary 없으면 React가 초기 렌더에서 throw away the client할 거라 useState 피한다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
