import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ButtonNext from "../components/ButtonNext";
import ModalAlertOnboarding from "../components/ModalAlertOnboarding";

import { ScreenComponentProps } from "../type/onboardingType";

const genderOptions = [
  { label: "Laki - laki", value: "1" },
  { label: "Perempuan", value: "0" },
];

const OnboardingGenderScreen: React.FC<ScreenComponentProps> = ({ onNext, onPrev, data, setField }) => {
  const [gender, setGender] = useState<number | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ([1, 0].includes(data?.gender)) setGender(data.gender);
  }, [data?.gender]);

  const submit = async () => {
    if (![1, 0].includes(Number(gender))) {
      setError("Mohon di isi jenis kelamin anda");
      return;
    }

    setLoading(true);
    try {
      setField("gender", gender === 1 ? 1 : 0)
      onNext()
      setLoading(false);
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
        transition={{ duration: 1 }}
        className="text-white text-2xl font-bold mb-4"
      >
        Kamu adalah?
      </motion.h1>

      <div className="flex flex-col gap-4">
        {genderOptions.map((item, idx) => (
          <motion.div
            key={item.value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: idx * 0.2 }}
            className="cursor-pointer"
            onClick={() => setGender(Number(item.value))}
          >
            <div className="flex items-center bg-white h-9 px-4 rounded-md">
              <div className="flex items-center justify-center w-4 h-4 border-2 border-gray-700 rounded-full mr-2">
                {gender === Number(item.value) && <div className="w-2 h-2 rounded-full bg-gray-700" />}
              </div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <ButtonNext
        actionPrev={onPrev}
        readyNext={[0, 1].includes(gender as number)}
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

export default OnboardingGenderScreen;
