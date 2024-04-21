const Notification = ({ notification }) => {
  console.log("the notification", notification);
  let demandes = notification;

  const styleDemand = (etas) => {
    if (etas == "en cours") {
      return "bg-gray-500";
    }
    if (etas == "refusée") {
      return "bg-red-500";
    }
    if (etas == "done") {
      return "bg-green-500";
    }
    return "";
  };

  return (
    <div className=" flex flex-col dropDownProfile">
      <ul className="flex flex-col gap-4">
        {demandes.map((notif, index) => (
          <li key={index} className={`${styleDemand(notif.etas)}`}>
            {" "}
            {notif.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Notification;
