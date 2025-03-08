import { getDateRanges, getMonthDates } from "@/utils/getCurrentWeek";
import { useEffect, useState } from "react";
import { Charts } from "./Charts";

type DataListProps = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderRadius: number;
};
interface Props {
  labels: string[];
  datasets: DataListProps[];
}

export default function MonthChart() {
  const [monthData, setMonthData] = useState<Props>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderRadius: 0,
        backgroundColor: [],
      },
    ],
  });

  const { firstDayOfMonth, lastDayOfMonth } = getDateRanges();
  const startDate = firstDayOfMonth;
  const endDate = lastDayOfMonth;
  const getMonthData = async () => {
    const userId = await localStorage.getItem("userId");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expense/getExpenseByDates`,
        {
          method: "POST",
          body: JSON.stringify({ userId, startDate, endDate }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMonthData({
        labels: getMonthDates(),
        datasets: [
          {
            label: "Expense This Month",
            data: data.data.map((item: any) => item.total_amount),
            borderRadius: 20,
            backgroundColor: [
              "#f9aec4",
              "#c6f2a4",
              "#333333",
              "#FFC774",
              "#b1c5fa",
            ],
          },
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    getMonthData();
  }, []);
  return (
    <div className="rounded-md p-2">
      <Charts dataList={monthData} />
    </div>
  );
}
