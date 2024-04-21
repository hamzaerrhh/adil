import { BsCurrencyDollar } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
const reverseData = (data) => {
  // Calculate the total amount for each category
  const categoryTotals = data.reduce((totals, item) => {
    if (!totals[item.category]) {
      totals[item.category] = 0;
    }
    totals[item.category] += item.amount;
    return totals;
  }, {});

  // Calculate the total amount of all categories
  const totalAmount = Object.values(categoryTotals).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Calculate the percentage for each category
  const categoryPercentages = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      x: category,
      y: amount,
      z: ((amount / totalAmount) * 100).toFixed(2) + "%", // Percentage of each category relative to the total
    })
  );

  return categoryPercentages;
};
const convertsTobase4 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};
const addIconAndColorsToTransactions = (transactions) => {
  return transactions.map((trans) => {
    let icon, iconColor, iconBg, pcColor;

    if (trans.category === "investment") {
      icon = <BsCurrencyDollar />;
      iconColor = "#03C9D7";
      iconBg = "#E5FAFB";
      pcColor = "green-600";
    } else if (trans.category === "expense") {
      icon = <FiCreditCard />;
      iconColor = "rgb(255, 244, 229)";
      iconBg = "rgb(254, 201, 15)";
      pcColor = "green-600";
    } else {
      icon = <TiTick />;
      iconColor = "rgb(228, 106, 118)";
      iconBg = "rgb(255, 244, 229)";
      pcColor = "green-600";
    }

    return {
      ...trans,
      icon: icon,
      iconColor: iconColor,
      iconBg: iconBg,
      pcColor: pcColor,
    };
  });
};

export { reverseData, addIconAndColorsToTransactions, convertsTobase4 };
