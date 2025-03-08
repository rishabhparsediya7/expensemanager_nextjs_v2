import React, { Suspense } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Loader from "./Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({
  expenseData,
  expenseLabels,
}: {
  expenseData: number[];
  expenseLabels: string[];
}) {
  const data = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Expense Amount: Rs",
        data: expenseData,
        backgroundColor: [
          "#FF6384", // Soft Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#C9CBCF", // Light Grey
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Suspense fallback={<Loader />}>
      <Pie height={200} className="max-h-[20rem]" data={data} />
    </Suspense>
  );
}
