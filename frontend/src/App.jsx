import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Classes from "./pages/Classes";
import UploadXML from "./pages/UploadXML";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Class from "./features/classes/Class";
import CreateBlog from "./features/blogs/CreateBlog";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";

// Set up the cache, store the remote date in the cache so that we don't need to fetch the same data from the server every time
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="sign_up" element={<SignUp />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="classes" />} />
              <Route path="classes" element={<Classes />} />
              <Route path="classes/:id" element={<Class />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/new" element={<CreateBlog />} />
              <Route
                path="upload_xml"
                element={
                  <ProtectedRoute accessRoles={["admin", "trainer"]}>
                    <UploadXML />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="account" element={<Account />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              textColor: "#374152",
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
