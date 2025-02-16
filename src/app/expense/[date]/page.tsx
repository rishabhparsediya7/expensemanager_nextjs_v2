"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { converter } from "@/utils/currencyFormatter";
import withAuth from "@/app/_auth/page";
import { useAuth } from "@/app/_context/AuthContext";
import { category } from "@/constants/category";
type ExpenseType = {
  description: string;
  amount: string;
  categoryId: number;
  date: string;
};

const Expense = () => {
  const params = useParams();
  const { date } = params;
  const dateString: string[] = date.toString().split("-");
  const d = `${dateString[2]}-${dateString[1].padStart(
    2,
    "0"
  )}-${dateString[0].padStart(2, "0")}`;
  const createdAt = new Date(d).toISOString();
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dependencyCount, setDependencyCount] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [expenseType, setExpenseType] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [expenseList, setExpenseList] = useState([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const { user } = useAuth();

  const toggleModal = (type: string) => {
    const body = document.querySelector(".bodyy");
    if (body !== null) {
      if (type === "open" && !body.classList.contains("open-modal")) {
        body.classList.add("open-modal");
      } else if (body.classList.contains("open-modal"))
        body.classList.remove("open-modal");
    }
  };
  const handleAddExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isNaN(parseFloat(amount))) {
      setError("Amount should be in number..");
      return;
    }
    setLoading(true);
    const amnt: number = parseInt(amount);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expense/add`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: user.userId,
            amount: amnt,
            description: name,
            category: expenseType,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setDependencyCount((prev) => prev + 1);
        toggleModal("close");
      } else {
        setError("Could not add the expense");
      }
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
      setName("");
      setAmount("");
    }
  };
  const handleExpenseTypeChange = (event: ChangeEvent<HTMLInputElement>) =>
    setExpenseType(parseInt(event.target.value));

  const fetchAllTheExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expense/date`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: user.userId,
            expenseDate: createdAt.split("T")[0],
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        setError("Empty Expenses");
      } else {
        const result = await response.json();
        if (result.data !== undefined) {
          setExpenseList(result.data);
          setTotalSum(result.totalSum);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setError("");
    }
  }, [createdAt, user.userId]);

  useEffect(() => {
    fetchAllTheExpenses();
  }, [dependencyCount, fetchAllTheExpenses]);
  if (dependencyCount === 0 && loading) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <div className="bodyy">
        <Navbar />
        <div
          className="modal-container"
          onClick={() => toggleModal("close")}
        ></div>
        <div className="modal-window">
          <div className="card-container">
            {error && <p className="text-red-400">{error}</p>}
            <form className="flex flex-col w-full gap-y-4 p-2">
              <div className="flex">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Expense name"
                  className="border-b-2 outline-none border-b-gray-300 p-1.5 w-full"
                />
              </div>
              <div>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="border-b-2 outline-none border-b-gray-300 p-2 w-full"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {category.map((category: any) => (
                  <div key={category.id} className="space-x-2">
                    <input
                      className="checkbox-tools"
                      type="radio"
                      name="expenseType"
                      id={category.id}
                      value={category.id}
                      checked={expenseType === category.id}
                      onChange={handleExpenseTypeChange}
                    />
                    <label htmlFor={category.id}>{category.name}</label>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <button
                  onClick={(e) => handleAddExpense(e)}
                  className="bg-blue-600 flex justify-center gap-x-2 items-center p-3 rounded-3xl text-white w-full"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-x-2 w-full p-2">
            <div className="w-full flex-1">
              {loading ||
                (expenseList.length == 0 && (
                  <div className="w-full flex items-center justify-center">
                    <Image
                      src="/emptyexpense.png"
                      alt="empty expense"
                      height={500}
                      width={500}
                    ></Image>
                  </div>
                ))}
              <div
                className={` ${
                  expenseList.length > 0 ? `h-[75vh]` : `h-fit`
                } flex flex-col overflow-y-scroll custom-scrollbar`}
              >
                {expenseList.length > 0 && (
                  <table className="table-auto bg-white border w-full">
                    <thead className="bg-white p-0">
                      <tr className="text-left">
                        <th className="p-2">Expense Name</th>
                        <th className="p-2">Expense Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseList.length > 0 &&
                        expenseList.map((a: ExpenseType, index: number) => (
                          <tr key={index} className="border">
                            <td className="p-2 first-letter:capitalize">
                              {a.description}
                            </td>
                            <td className="p-2 text-green-500">
                              {converter(a.amount)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
                {loading && <Loader />}
              </div>
              <div className="w-full p-2">
                <h1 className="text-right text-green-500 text-lg tracking-wider">
                  Total: <span className="font-bold">{totalSum}</span>
                </h1>
              </div>
              <div className="w-full block sm:hidden">
                <div className="flex flex-col">
                  <button
                    onClick={() => toggleModal("open")}
                    className="bg-blue-600 flex justify-center gap-x-2 items-center p-3 rounded-3xl text-white w-full"
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </div>
            {/* Category and Add Expense Form */}
            <div className="hidden px-4 max-w-[40rem] sm:block flex-1">
              <div className="card-container">
                <h1 className="text-center font-bold text-2xl uppercase">
                  Add an Expense
                </h1>
                {error && <p className="text-red-400">{error}</p>}
                <form className="flex flex-col w-full gap-y-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Expense name"
                      className="border-b-2 outline-none border-b-gray-300 p-1.5 w-full"
                    />
                  </div>
                  <div>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                      className="border-b-2 outline-none border-b-gray-300 p-2 w-full"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {category.map((category: any) => (
                      <div key={category.id} className="space-x-2">
                        <input
                          className="checkbox-tools"
                          type="radio"
                          name="expenseType"
                          id={category.id}
                          value={category.id}
                          checked={expenseType === category.id}
                          onChange={handleExpenseTypeChange}
                        />
                        <label htmlFor={category.id}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={(e) => handleAddExpense(e)}
                      className="bg-black flex justify-center gap-x-2 items-center p-3 rounded-3xl text-white w-full"
                    >
                      Add Expense
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default withAuth(Expense);
