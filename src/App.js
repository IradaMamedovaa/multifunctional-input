import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CustomInput from "components/custom-input/CustomInput";
import useFormulaStore from "utils/store/store";

const queryClient = new QueryClient();

function App() {
  const inputValue = useFormulaStore((state) => state.formula);

  // console.log('inputValue: ',inputValue)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CustomInput value={inputValue} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
