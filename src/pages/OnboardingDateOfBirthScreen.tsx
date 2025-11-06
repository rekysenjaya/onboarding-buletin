import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";

import DateInput from "../components/DateInput";
import ButtonNext from "../components/ButtonNext";
import ModalAlertOnboarding from "../components/ModalAlertOnboarding";

import { ScreenComponentProps } from "../type/onboardingType";

const OnboardingDateOfBirthScreen: React.FC<ScreenComponentProps> = ({ onNext, onPrev, data, setField }) => {
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data?.dob) {
      const m = moment(data.dob, "YYYY-MM-DD");
      if (m.isValid()) {
        setDate(m.format("DD"));
        setMonth(m.format("MM"));
        setYear(m.format("YYYY"));
        setDob(data.dob);
      }
    }
  }, [data]);

  const submit = async () => {
    if (!dob) {
      setError("Mohon diisi tanggal lahir Anda");
      return;
    }
    setLoading(true);
    try {
      setField("dob", dob)
      // await api.postOnboarding(token, { dob, step: 4 });
      setLoading(false);
      onNext();
    } catch {
      setLoading(false);
      setError("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-2xl font-bold mb-4"
      >
        Saya lahir tanggal?
      </motion.h1>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-white text-xs mb-4"
      >
        Akan ada kejutan dari GoodBuletin di hari ulang tahun-mu!
      </motion.p>

      <DateInput
        date={date}
        month={month}
        year={year}
        onChangeDate={setDate}
        onChangeMonth={setMonth}
        onChangeYear={setYear}
        onValidDobChange={setDob}
      />

      <ButtonNext
        actionPrev={onPrev}
        readyNext={!!dob}
        loadingNext={loading}
        actionNext={submit}
      />

      {error && (
        <ModalAlertOnboarding
          modalTextType="error"
          modalTextDesc={error}
          actionModal={() => setError("")}
        />
      )}
    </div>
  );
};

export default OnboardingDateOfBirthScreen;
