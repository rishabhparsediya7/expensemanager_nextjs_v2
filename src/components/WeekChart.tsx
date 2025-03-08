import { getDateRanges, getWeek } from "@/utils/getCurrentWeek";
import { useCallback, useEffect, useState } from "react";
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
export default function WeekChart() {
  const weekArray = getWeek();
  const [weekData, setWeekData] = useState<Props>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderRadius: 0,
      },
    ],
  });

  const { firstDayOfWeek, lastDayOfWeek } = getDateRanges();
  const startDate = firstDayOfWeek;
  const endDate = lastDayOfWeek;

  const getWeekData = useCallback(async () => {
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
      setWeekData({
        labels: weekArray,
        datasets: [
          {
            label: "Expense This Week",
            data: data.data.map((item: any) => item.total_amount),
            backgroundColor: [
              "#f9aec4",
              "#c6f2a4",
              "#333333",
              "#FFC774",
              "#b1c5fa",
            ],
            borderRadius: 20,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getWeekData();
  }, [startDate, endDate]);
  return (
    <div className="rounded-md">
      <Charts dataList={weekData} />
    </div>
  );
}
