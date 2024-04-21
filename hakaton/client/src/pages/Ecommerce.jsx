import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IoIosMore } from "react-icons/io";
import { FaInvision, FaExpand, FaGetPocket } from "react-icons/fa";
import axios from "axios";
import { Pie, Button, LineChart, SparkLine } from "../components";
import { recentTransactions, ecomPieChartData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import {
  reverseData,
  addIconAndColorsToTransactions,
} from "../function/funtionpie";
import {
  FaAdn,
  FaMoneyBill,
  FaPray,
  FaRunning,
  FaUserCircle,
} from "react-icons/fa";
import Cookies from "js-cookie";
import TaskCard from "../components/card/TaskCard";

const Ecommerce = () => {
  const avatar =
    "https://th.bing.com/th/id/OIP.QA1KhluQq05tiNzHJVqohQHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.5&pid=1.7";
  const [topUsers, setTopUsers] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [salary, setSalary] = useState({});
  const [books, setBooks] = useState([]);
  const [lastEvent, setLastEvent] = useState({});
  const [lastTasks, setLastTasks] = useState([]);
  const [score, setScore] = useState({});
  const pieData = reverseData(transaction);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = Cookies.get("token");
  //       const res = await axios.post("http://localhost:5000/data/homeData", {
  //         token,
  //       });
  //       console.log(res.data);
  //       console.log("top users", topUsers);

  //       setTopUsers(res.data.topUsers);
  //       setTransaction(res.data.transaction);
  //       setSalary(res.data.salaryData);
  //       setBooks(res.data.books);
  //       setLastEvent(res.data.event[0]);
  //       setLastTasks(res.data.lastTasksDone);
  //       setScore(res.data.score);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // add icon to transaction
  const listTransaction = addIconAndColorsToTransactions(transaction);
  console.log(listTransaction);

  const scoredata = [
    {
      icon: <FaPray />,
      value: score.Mental_Health,
      title: "mental health",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <FaRunning />,
      value: score.Physique,
      title: "physique health",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FaMoneyBill />,
      value: score.Money,
      title: "economie",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",
      pcColor: "green-600",
    },
    {
      icon: <FaUserCircle />,
      value: score.Social,
      title: "Refunds",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "red-600",
    },
  ];

  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Score</p>
              <p className="text-2xl">{score.total}</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {scoredata.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.value}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">last updates Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <BsThreeDotsVertical />
                </span>
                <span>tasks done</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {lastTasks.map((task, index) => (
              <TaskCard task={task} key={index} />
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">ur mony change</p>
              <p className="text-gray-400">trak ur mony </p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={pieData}
                //get here your salary data
                legendVisiblity={false}
                height="160px"
                headerText={"track mony"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <a>trak ur transaction </a>
          </div>
          <div className="mt-10 w-72 md:w-400">
            {listTransaction.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">trak ur score</p>
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">top users</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
            {topUsers.map((user, index) => (
              <div key={index} className="flex justify-between mt-4 w-full">
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    className=" text-white rounded-full p-3 hover:drop-shadow-xl"
                  >
                    <img
                      src={
                        user.profilePhoto
                          ? `http://localhost:5000/${user.profilePhoto}`
                          : avatar
                      }
                      width={20}
                      height={20}
                      className="rounded-full bg-cover"
                      style={{ width: "50px", height: "50px" }} // Adjust width and height as needed
                      alt={`Profile of ${user.username}`}
                    />
                  </button>
                  <div>
                    <p className="text-md font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-400">{user.description}</p>
                  </div>
                </div>
                <p>{user.score.total}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Last Event</p>
            <button
              type="button"
              className="text-xl font-semibold text-gray-500"
            >
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <div className="mt-8">
              <img
                className="md:w-96 h-50"
                src={`http://localhost:5000/${lastEvent.imageEvent}`}
                alt=""
              />
              <div className="mt-8">
                <p className="font-semibold text-lg">{lastEvent.title}</p>
                <p className="text-gray-400">in :{lastEvent.location}</p>
                <p className="mt-8 text-sm text-gray-400">
                  {lastEvent.description}
                </p>
                <div className="mt-3">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Read More"
                    borderRadius="10px"
                    href={lastEvent.urlRegister} // Assuming you have a property for the registration URL
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-between gap-7 w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          {books.slice(-3).map((book, index) => (
            <div key={index} className="mt-8">
              <img
                className="md:w-96 h-50"
                src={`http://localhost:5000/${book.bookImage}`}
                alt={book.title}
              />
              <div className="mt-8">
                <p className="font-semibold text-lg">{book.title}</p>
                <p className="text-gray-400">By {book.author}</p>
                <p className="mt-8 text-sm text-gray-400">{book.description}</p>
                <div className="mt-3">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Read More"
                    borderRadius="10px"
                    href={book.url} // Assuming you have a property for the book URL
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
