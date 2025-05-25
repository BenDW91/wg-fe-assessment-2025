import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Users from "./users";

function App() {  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to='/users' replace />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
