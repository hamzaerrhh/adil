import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const [image, setImge] = useState(avatar);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const logout = async () => {
    Cookies.remove("token");

    console.log("logout succes");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const getUser = async () => {
      const token = Cookies.get("token");
      const res = await axios.post("http://localhost:5000/user/me", { token });
      console.log(res.data);

      if (res.data.profilePhoto) {
        setImge(`http://localhost:5000/${res.data.profilePhoto}`);
      }

      setName(res.data.username);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  console.log("name", name, "image", image);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <button onClick={logout}>log out</button>
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <a href="/userProfile">
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
              <img
                className="rounded-full w-8 h-8"
                src={image}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {name}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </a>
        </TooltipComponent>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
