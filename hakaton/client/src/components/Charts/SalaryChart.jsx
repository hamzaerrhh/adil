import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const SalaryChart = ({ transactions }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      const ctx = document.getElementById("amountChart");
      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Expenses", "Income", "Investments"],
          datasets: [
            {
              data: [
                calculateExpenses(),
                calculateIncome(),
                calculateInvestments(),
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFA500"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFA500"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: "right",
            },
          },
        },
      });
      setChart(newChart);
    } else {
      chart.data.datasets[0].data = [
        calculateExpenses(),
        calculateIncome(),
        calculateInvestments(),
      ];
      chart.update();
    }
  }, [chart, transactions]);

  const calculateExpenses = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.category === "expense") {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const calculateIncome = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.category === "income") {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  const calculateInvestments = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.category === "investment") {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  };

  return (
    <div className="text-center">
      <canvas
        id="amountChart"
        style={{ maxWidth: "750px", margin: "0 auto" }}
      />
    </div>
  );
};

export default SalaryChart;
