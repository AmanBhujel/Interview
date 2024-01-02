import { Suspense } from "react";
import AppRouter from "./router/routes";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>    </>
  );
}

export default App;
const Loading=()=>{
  return <p>Loading...</p>
}