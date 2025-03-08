import { useEffect, useState } from "react";
import { PieChart } from "./PieChart";

export default function ExpenseWithCategory() {
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [expenseLabels, setExpenseLabels] = useState<string[]>([]);
  const getExpenseData = async () => {
    const userId = await localStorage.getItem("userId");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expense/getExpenseByCategory`,
        {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setExpenseData(data.data.map((expense: any) => expense.amount));
      setExpenseLabels(data.data.map((expense: any) => expense.name));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    getExpenseData();
  }, []);
  return (
    <div className="shadow-md rounded-md p-2">
      <PieChart expenseData={expenseData} expenseLabels={expenseLabels} />
    </div>
  );
}
