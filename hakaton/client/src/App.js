import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import EditProfile from "./pages/EditProfile";
import Health from "./pages/Health";
import axios from "axios";
import Events from "./pages/Events";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import { Ecommerce, Pyramid, Kanban, Line, Pie, Bar } from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import TrakerSalary from "./pages/TrakerSalary";
import { useStateContext } from "./contexts/ContextProvider";
import MyCalendar from "./pages/Calendar";
import UserProfile from "./pages/UserProfile";
import Tasks from "./pages/Tasks";
import Cours from "./pages/Cours";
import Book from "./pages/Book";
import AddBook from "./pages/AddBook";
import AddEvent from "./pages/AddEvent";
import Test from "./pages/Test";
import NavStu from "./pages/student/components/NavStu";
import FooterStu from "./pages/student/components/FooterStu";
import Home from "./pages/student/Home";
import Paper from "./pages/student/Paper";
import EventStu from "./pages/student/EventStu";
import ClubStu from "./pages/student/ClubStu";
import Info from "./pages/student/Info";
import UserStu from "./pages/student/UserStu";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("start getting user");
        const res = await axios.get(`http://localhost:5000/auth/user`, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  if (user) {
    console.log(user.role, "ffffffffffffffffff");
  }
  return (
    <BrowserRouter>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        {!user && (
          <Routes>
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          </Routes>
        )}
        {user && user.role === "user" && (
          <>
            <NavStu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demander_les_papier" element={<Paper />} />
              <Route path="/discover_event" element={<EventStu />} />
              <Route path="/discover_club" element={<ClubStu />} />
              <Route path="/info" element={<Info />} />
              <Route path="/profile_info" element={<UserStu />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <FooterStu />
          </>
        )}
        {/* admin */}
        {user &&
          (user.role === "supadmin" ||
            user.role === "responsable d'attestaion") && (
            <div className="flex relative dark:bg-main-dark-bg">
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <TooltipComponent content="Settings" position="Top">
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: "50%" }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
              <div
                className={
                  activeMenu
                    ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                    : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
                <div>
                  {themeSettings && <ThemeSettings />}
                  <Routes>
                    {/* Public routes accessible when not logged in */}

                    <>
                      {/* Private routes accessible only when logged in */}
                      <Route path="/userprofile" element={<UserProfile />} />
                      <Route path="/test" element={<Test />} />
                      <Route
                        path="/userprofile/edit"
                        element={<EditProfile />}
                      />
                      <Route path="/cours" element={<Cours />} />
                      <Route path="/event" element={<Events />} />
                      <Route path="/book" element={<Book />} />
                      <Route path="/book/add" element={<AddBook />} />
                      <Route path="/event/add" element={<AddEvent />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/home" element={<Ecommerce />} />
                      <Route path="/salary" element={<TrakerSalary />} />
                      <Route path="/health" element={<Health />} />
                      <Route path="/" element={<Ecommerce />} />
                      <Route path="/ecommerce" element={<Ecommerce />} />

                      <Route path="/kanban" element={<Kanban />} />
                      <Route path="/calendar" element={<MyCalendar />} />
                      <Route path="/line" element={<Line />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/pyramid" element={<Pyramid />} />
                    </>
                  </Routes>
                </div>
              </div>
            </div>
          )}
      </div>
    </BrowserRouter>
  );
};

export default App;
