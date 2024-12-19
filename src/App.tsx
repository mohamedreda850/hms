import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import AuthLayout from "./Modules/Authentication/AuthLayout/AuthLayout";
import Login from "./Modules/Authentication/Login/Login";
import Register from "./Modules/Authentication/Register/Register";
import ForgotPassword from "./Modules/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./Modules/Authentication/ResetPassword/ResetPassword";
import AdminProtectedRoute from "./Modules/ProtectedRoute/AdminProtectedRoute/AdminProtectedRoute";
import MasterAdminLayout from "./Modules/Admin/Shared/MasterAdminLayout/MasterAdminLayout";
import NotFound from "./Modules/Admin/Shared/NotFound/NotFound";
import Dashboard from "./Modules/Admin/Dashboard/Dashboard";
import RoomsList from "./Modules/Admin/Rooms/RoomsList/RoomsList";
import RoomsForm from "./Modules/Admin/Rooms/RoomsForm/RoomsForm";
import FacilitiesList from "./Modules/Admin/Facilities/FacilitiesList/FacilitiesList";
import FacilitiesForm from "./Modules/Admin/Facilities/FacilitiesForm/FacilitiesForm";
import ADSList from "./Modules/Admin/ADS/ADSList/ADSList";
import ADSForm from "./Modules/Admin/ADS/ADSForm/ADSForm";
import BookingList from "./Modules/Admin/Booking/BookingList";
import UsersList from "./Modules/Admin/UsersList/UsersList";
import UserProtectedRoute from "./Modules/ProtectedRoute/UserProtectedRoute/UserProtectedRoute";
import UserMasterLayout from "./Modules/User/Shared/UserMasterLayout/UserMasterLayout";
import HomePage from "./Modules/User/HomePageColection/HomePage/HomePage";
import Explore from "./Modules/User/Explore/Explore";
import BookingPage from "./Modules/User/Booking/BookingPage";
import DetailsPage from "./Modules/User/DetailsPage/DetailsPage";
import Favorates from "./Modules/User/Favorates/Favorates";
import ChangePassword from "./Modules/Authentication/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminProtectedRoute>
          <MasterAdminLayout />
        </AdminProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },

        {
          path: "rooms",
          element: <RoomsList />,
        },
        {
          path: "rooms/:id",
          element: <RoomsForm />,
        },
        {
          path: "rooms/newroom",
          element: <RoomsForm />,
        },
        {
          path: "facilities",
          element: <FacilitiesList />,
        },
        {
          path: "facilities/:id",
          element: <FacilitiesForm />,
        },
        {
          path: "facilities/newfacility",
          element: <FacilitiesForm />,
        },
        {
          path: "ads",
          element: <ADSList />,
        },
        {
          path: "ads/:id",
          element: <ADSForm />,
        },
        {
          path: "ads/newads",
          element: <ADSForm />,
        },
        {
          path: "booking",
          element: <BookingList />,
        },
        {
          path: "usersList",
          element: <UsersList />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/",
      element: <UserMasterLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "explore-rooms",
          element: <Explore />,
        },
        {
          path: "booking-page/:id",
          element: <BookingPage />,
        },
        {
          path: "explore-rooms/:id",
          element: <DetailsPage />,
        },
        {
          path: "favorites",
          element: <Favorates />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
