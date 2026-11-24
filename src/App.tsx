import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyMap } from "./components/MapExample";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MyMap />
      </QueryClientProvider>
    </>
  );
}

export default App;
