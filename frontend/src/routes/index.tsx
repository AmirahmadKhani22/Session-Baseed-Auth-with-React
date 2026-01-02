/* eslint-disable react-hooks/exhaustive-deps */
import {lazy , Suspense} from "react"
import useAuthStore from "@/stores/auth"
import RootErrorBoundary from "./errorBoundary"
import {BrowserRouter , Route , Routes} from "react-router"
import RootLayout from "@/layouts"
import GeneralPagesLayout from "@/layouts/generalPages"
import HomePage from "@/pages"
import AuthLayout from "@/layouts/auth"
import DashboardLayout from "@/layouts/dashboard"
import ErrorLayout from "@/layouts/error"
import Notfound from "@/pages/Errors/404"
import ModalLoading from "@/components/loadings/modal"

const LoginPage = lazy(() => import('@/pages/Auth/Login'))
const RegisterPage = lazy(() => import('@/pages/Auth/Register'))
const AdminHome = lazy(() => import('@/pages/Dashboard/Admin'))
const BuyerHome = lazy(() => import('@/pages/Dashboard/Buyer'))
const SellerHome = lazy(() => import('@/pages/Dashboard/Seller'))

function App() {
  const user = useAuthStore(state => state.user)

  return (
    <RootErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            {/* root routes */}
            <Route element={<GeneralPagesLayout />}>
              <Route
                path="/"
                element={<HomePage />}
              />
            </Route>
            {/* auth routes */}
            <Route 
              path="auth"
              element={<AuthLayout />}
            >
              <Route
                path="login"
                element={(
                  <Suspense fallback={<ModalLoading />}>
                    <LoginPage />
                  </Suspense>
                )}
              />
              <Route
                path="register"
                element={(
                  <Suspense fallback={<ModalLoading />}>
                    <RegisterPage />
                  </Suspense>
                )}
              />
            </Route>
            {/* dashboard routes */}
            <Route
              path="dashboard"
              element={<DashboardLayout />}
            >
              {
                /* admin dashboard routes */
                (user?.role === "ADMIN") && (
                  <Route>
                    <Route 
                      index
                      element={(
                        <Suspense fallback={<ModalLoading />}>
                          <AdminHome />
                        </Suspense>
                      )}
                    />
                  </Route>
                )
              }
              {
                /* buyer dashboard routes */
                (user?.role === "BUYER") && (
                  <Route>
                    <Route 
                      index
                      element={(
                        <Suspense fallback={<ModalLoading />}>
                          <BuyerHome />
                        </Suspense>
                      )}
                    />
                  </Route>
                )
              }
              {
                /* seller dashboard routes */
                (user?.role === "SELLER") && (
                  <Route>
                    <Route 
                      index
                      element={(
                        <Suspense fallback={<ModalLoading />}>
                          <SellerHome />
                        </Suspense>
                      )}
                    />
                  </Route>
                )
              }
            </Route>
            <Route element={<ErrorLayout />}>
              <Route 
                path="*"
                element={<Notfound />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RootErrorBoundary>
  )
}

export default App
