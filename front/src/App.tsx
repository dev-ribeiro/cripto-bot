import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/query";
import { Router } from "./Router";

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
