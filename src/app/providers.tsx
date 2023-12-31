"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { Toaster } from "react-hot-toast";

type Props = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </SessionProvider>
  );
};
