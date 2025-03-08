"use client";
import ChartNavigator from "@/components/ChartNavigator";
import ExpenseWithCategory from "@/components/ExpenseTypeChart";
import Loader from "@/components/Loader";
import MonthChart from "@/components/MonthChart";
import Navbar from "@/components/Navbar";
import WeekChart from "@/components/WeekChart";
import {
  CarTaxiFront,
  Globe,
  LeafyGreen,
  ReceiptIndianRupee,
  UtensilsCrossed,
} from "lucide-react";
import { Suspense, useState } from "react";
import withAuth from "../_auth/page";
type PieProps = {
  amount: string;
  type: string;
};

const Dashboard = () => {
  const [type, setType] = useState("weekly");
  const backGroundColorArray = [
    "#f9aec4",
    "#c6f2a4",
    "#333333",
    "#FFC774",
    "#b1c5fa",
  ];
  const IconsArray = [
    <LeafyGreen key={"Grocery"} size={40} color={"white"} />,
    <UtensilsCrossed key="Food" size={40} color={"white"} />,
    <CarTaxiFront key="Travel" size={40} color={"white"} />,
    <Globe key="Other" size={40} color={"white"} />,
    <ReceiptIndianRupee key="Bills" size={40} color={"white"} />,
  ];
  const chartArray: string[] = ["weekly", "monthly", "expense"];

  const ComponentsArray = [
    <WeekChart key={"week"} />,
    <MonthChart key={"month"} />,
    <ExpenseWithCategory key={"expense"} />,
  ];

  const ActiveComponent = () => ComponentsArray[chartArray.indexOf(type)];

  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <div className="p-4">
          <ChartNavigator type={type} setType={setType} />
          {type && <ActiveComponent />}
          <div className="flex flex-col py-5">
            <h1 className="text-2xl p-2">Activity</h1>
          </div>
        </div>
      </Suspense>
    </div>
  );
};
export default withAuth(Dashboard);
