import { IoSettingsSharp } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { BsCalendarEventFill } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { useStateContext } from "../contexts/ContextProvider";

const UserProfile = () => {
  const { handleClick } = useStateContext();

  return (
    <div className="flex flex-col gap-4">
      <button
        className=" flex justify-end"
        onClick={handleClick("userProfile")}
      >
        <IoMdClose className="text-2xl text-gray-700 hover:text-gray-900" />
      </button>
      <ul className="flex flex-col gap-6">
        <li className="flex flex-row items-center gap-2">
          <FaAddressBook className="text-xl text-gray-700" />
          <span className="text-gray-700">user profile</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <GrScorecard className="text-xl text-gray-700" />
          <span className="text-gray-700">notes</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <IoSettingsSharp className="text-xl text-gray-700" />
          <span className="text-gray-700">books</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <BsCalendarEventFill className="text-xl text-gray-700" />
          <span className="text-gray-700">events</span>
        </li>
        <li className="flex flex-row items-center gap-2">
          <IoSettingsSharp className="text-xl text-gray-700" />
          <span className="text-gray-700">hhhhh</span>
        </li>
      </ul>
    </div>
  );
};
export default UserProfile;
