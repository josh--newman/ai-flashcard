import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useState } from "react";
import {
  HydrationBoundary,
  Query,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default App;
