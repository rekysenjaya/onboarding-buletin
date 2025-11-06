import { useState, useEffect, useCallback } from "react";
import { OnboardingData, Screen } from "../type/onboardingType";

const ONBOARDING_KEY = "onboarding_data";

const screens: Screen[] = [
  "OnboardingNameScreen",
  "OnboardingGenderScreen",
  "OnboardingDateOfBirthScreen",
  "OnboardingCategoryScreen",
  "OnboardingGenresScreen",
  "OnboardingNotifScreen",
  "OnboardingWhereInfoScreen",
];

export const useOnboardingData = () => {
  const defaultData: OnboardingData = {
    step: 1,
    lastStep: null,
  };

  const [data, setData] = useState<OnboardingData>(defaultData);
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    "OnboardingNameScreen"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load dari localStorage sekali di awal
  useEffect(() => {
    const saved = localStorage.getItem(ONBOARDING_KEY);
    if (saved) {
      try {
        const parsed: OnboardingData = JSON.parse(saved);
        setData(parsed);
        setCurrentScreen(screens[(parsed.step ?? 1) - 1]);
      } catch (err) {
        console.error("Failed to parse onboarding data:", err);
        // kalau data rusak, reset ke default
        setData(defaultData);
        localStorage.setItem(ONBOARDING_KEY, JSON.stringify(defaultData));
      }
    } else {
      // kalau belum ada, simpan default ke localStorage
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify(defaultData));
    }
    setIsLoaded(true);
  }, []);

  // ✅ Update localStorage hanya setelah data dari localStorage berhasil dimuat
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  // 🔹 Set step onboarding
  const setStep = useCallback((step: number) => {
    setData(prev => ({
      ...prev,
      lastStep: prev.step,
      step,
    }));
    setCurrentScreen(screens[step - 1] || "OnboardingNameScreen");
  }, []);

  // 🔹 Set field dinamis
  const setField = useCallback((key: string, value: any) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // 🔹 Navigasi ke next / prev screen
  const goNext = useCallback(() => {
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex < screens.length - 1) {
      setStep(currentIndex + 2);
    } else {
      console.log("🎉 Onboarding complete!");
    }
  }, [currentScreen, setStep]);

  const goPrev = useCallback(() => {
    const currentIndex = screens.indexOf(currentScreen);
    if (currentIndex > 0) {
      setStep(currentIndex);
    }
  }, [currentScreen, setStep]);

  // 🔹 Reset seluruh data onboarding
  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY);
    setData(defaultData);
    setCurrentScreen("OnboardingNameScreen");
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(defaultData));
  }, []);

  return {
    data,
    setStep,
    setField,
    goNext,
    goPrev,
    currentScreen,
    resetOnboarding,
  };
};
