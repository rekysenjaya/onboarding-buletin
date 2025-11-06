import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";

type DateInputProps = {
  date: string;
  month: string;
  year: string;
  onChangeDate: (val: string) => void;
  onChangeMonth: (val: string) => void;
  onChangeYear: (val: string) => void;
  onValidDobChange: (dob: string | null) => void;
};

const DateInput: React.FC<DateInputProps> = ({
  date,
  month,
  year,
  onChangeDate,
  onChangeMonth,
  onChangeYear,
  onValidDobChange,
}) => {
  const [error, setError] = useState("");

  // Validasi DOB setiap input berubah
  useEffect(() => {
    if (date.length === 2 && month.length === 2 && year.length === 4) {
      const dobVerify = `${year}-${month}-${date}`;
      if (moment(dobVerify, "YYYY-MM-DD", true).isValid()) {
        onValidDobChange(dobVerify);
        setError("");
      } else {
        onValidDobChange(null);
        setError("Tanggal lahir tidak valid");
      }
    } else {
      onValidDobChange(null);
      setError("");
    }
  }, [date, month, year, onValidDobChange]);

  const handleChange = (val: string, type: "date" | "month" | "year") => {
    const value = val.replace(/\D/g, ""); // Hanya angka
    switch (type) {
      case "date":
        if (value.length <= 2) onChangeDate(value);
        break;
      case "month":
        if (value.length <= 2) onChangeMonth(value);
        break;
      case "year":
        if (value.length <= 4) onChangeYear(value);
        break;
    }
  };

  // Blur: normalisasi / clamp
  const onBlurDate = () => {
    if (!date) return;
    const maxDate = moment(`${month || "01"}-${year || "2000"}`, "MM-YYYY").daysInMonth();
    let num = Number(date);
    if (num < 1) num = 1;
    if (num > maxDate) num = maxDate;
    onChangeDate(num.toString().padStart(2, "0"));
  };

  const onBlurMonth = () => {
    if (!month) return;
    let num = Number(month);
    if (num < 1) num = 1;
    if (num > 12) num = 12;
    onChangeMonth(num.toString().padStart(2, "0"));
    onBlurDate();
  };

  const onBlurYear = () => {
    if (!year) return;
    let num = Number(year);
    const minYear = 1945;
    const maxYear = Number(moment().subtract(13, "years").format("YYYY"));
    if (num < minYear) num = minYear;
    if (num > maxYear) num = maxYear;
    onChangeYear(num.toString());
    onBlurDate();
  };

  return (<motion.div
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.5, type: "spring" }}
    className="flex gap-2">
    <div className="flex flex-col">
      <span className="text-purple-400 text-sm font-semibold">Tanggal</span>
      <input
        id="date-input"
        type="text"
        placeholder="dd"
        value={date}
        onChange={(e) => handleChange(e.target.value, "date")}
        onBlur={onBlurDate}
        className="px-4 h-9 w-24 rounded-md mt-2 border border-gray-300"
      />
    </div>

    <div className="flex flex-col">
      <span className="text-purple-400 text-sm font-semibold">Bulan</span>
      <input
        id="month-input"
        type="text"
        placeholder="mm"
        value={month}
        onChange={(e) => handleChange(e.target.value, "month")}
        onBlur={onBlurMonth}
        className="px-4 h-9 w-24 rounded-md mt-2 border border-gray-300"
      />
    </div>

    <div className="flex flex-col">
      <span className="text-purple-400 text-sm font-semibold">Tahun</span>
      <input
        id="year-input"
        type="text"
        placeholder="yyyy"
        value={year}
        onChange={(e) => handleChange(e.target.value, "year")}
        onBlur={onBlurYear}
        className="px-4 h-9 w-28 rounded-md mt-2 border border-gray-300"
      />
    </div>

    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </motion.div>
  );
};

export default DateInput;
