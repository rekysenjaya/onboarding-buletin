// OnboardingNameScreen.tsx
import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

import { useOnboardingData } from "../hooks/useOnboadingData";

import ButtonNext from "../components/ButtonNext";
import ModalAlertOnboarding from "../components/ModalAlertOnboarding";

import { ScreenComponentProps } from "../type/onboardingType";


const OnboardingNameScreen: React.FC<ScreenComponentProps> = ({ onNext, setField, data }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(data?.fullname)
  }, [data?.fullname])

  const submit = async () => {
    if (!name?.length) {
      setError("Mohon di isi nama anda");
      return;
    }
    setLoading(true);
    try {
      setField('fullname', name)
      onNext()
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Mohon di isi nama anda");
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-white text-2xl font-bold"
      >
        Hi GBSquad, <br /> Siapa namamu?
      </motion.h1>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-gray-200 mt-2"
      >
        Supaya pengalamanmu sebagai penulis di GoodBuletin lebih personal, ceritakan sedikit tentang dirimu.
      </motion.p>
      <motion.input
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        type="text"
        placeholder="Masukan namamu disini"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setError("")
        }}
        className="w-full mt-4 p-3 rounded-lg border-none focus:outline-none"
      />
      <ButtonNext readyNext={!!name?.trim?.().length} loadingNext={loading} actionNext={submit} />
      {!!error && (
        <ModalAlertOnboarding modalTextType="error" modalTextDesc={error} actionModal={() => setError("")} />
      )}
    </div>
  );
};

export default OnboardingNameScreen;
