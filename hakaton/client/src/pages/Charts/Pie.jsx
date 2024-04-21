import React from "react";

import { ChartsHeader, Pie as PieChart } from "../../components";

const pieChartData = [
  { x: "pray", y: 19, text: `15%` },
  { x: "mentalhealth", y: 2, text: "" },
  { x: "physique", y: 3, text: "15%" },
  { x: "social", y: 4, text: "11%" },
];

const Pie = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="Project Cost Breakdown" />
    <div className="w-full">
      <PieChart
        id="chart-pie"
        data={pieChartData}
        legendVisiblity
        height="full"
        headerText="score"
      />
    </div>
  </div>
);

export default Pie;
