export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind Working 🚀
        </h1>
      </div>
    </div>
  );
}

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/login/login";
// import Signup from "./pages/signup/signup";
// import ProtectedRoute from "./components/protectedRoute";
// import Dashboard from "./pages/dashboard/dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;