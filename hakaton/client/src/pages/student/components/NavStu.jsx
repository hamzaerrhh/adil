import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import Notification from "./Notification";
import NavItem from "./Nvitem";

const NavStu = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [demand, setDemand] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const name = "hamza";
  //feetch all demand
  useEffect(() => {
    const feetchDemand = async () => {
      console.log("start geting my demand");
      const res = await axios.get("http://localhost:5000/services/feetchmy", {
        withCredentials: true,
      });

      console.log(res.data);
      setDemand(res.data);
    };
    feetchDemand();
  }, []);

  const logo =
    "https://www.laformation.ma/images/300/eco-kpckyi51pm4vfrxwu4safg10gw4vsy01022016013052.jpg";
  const avatar =
    "https://th.bing.com/th/id/OIP.5Nr5OtyuX9auK0QvHGly_AHaHa?rs=1&pid=ImgDetMain";

  return (
    <>
      <nav className="bg-white mt-12 flex justify-between items-center mx-10">
        <div className="flex items-center gap-4">
          <img src={logo} width={32} height={32} alt="logo" />
          <span className="hidden md:block">Ump University</span>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="block md:hidden ease-in transition-opacity duration-300"
          >
            {showSidebar ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-6">
            <NavItem
              text="Services"
              items={[
                { name: "service de client" },
                { name: "demande des feuille" },
                { name: "inscris module sup" },
              ]}
            />
            <NavItem text="Clubs" />
            <NavItem text="Contact Us" />
          </ul>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex relative">
              {demand && demand.length >= 1 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {demand.length}
                </div>
              )}
              <IoIosNotificationsOutline
                className="relative w-8 h-8"
                onClick={() => {
                  setShowNotification(!showNotification);
                }}
              />
              {showNotification && <Notification notification={demand} />}
            </div>
          </div>

          {name}
          <a href="/profile_info">
            <img src={avatar} alt="profile" width={32} height={32} />
          </a>
        </div>
      </nav>
      <div className="block md:hidden">
        {!showSidebar && (
          <div className="bg-white mt-12 flex flex-col justify-between items-start mx-10">
            <ul>
              <NavItem
                text="Services"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              />
              {showServices && (
                <ul>
                  <li>Service 1</li>
                  <li>Service 2</li>
                  <li>Service 3</li>
                </ul>
              )}
              <NavItem text="Clubs" />
              <NavItem text="Contact Us" />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default NavStu;
