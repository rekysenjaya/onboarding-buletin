import React, { useEffect, useState } from "react";

import OnboardingNameScreen from "./pages/OnboardingNameScreen";
import OnboardingGenderScreen from "./pages/OnboardingGenderScreen";
import OnboardingDateOfBirthScreen from "./pages/OnboardingDateOfBirthScreen";
import OnboardingCategoryScreen from "./pages/OnboardingCategoryScreen";
import OnboardingGenresScreen from "./pages/OnboardingGenresScreen";
import OnboardingNotifScreen from "./pages/OnboardingNotifScreen";
import OnboardingWhereInfoScreen from "./pages/OnboardingWhereInfoScreen";

import ProgressBar from "./components/ProgressBar";

import { useOnboardingData } from "./hooks/useOnboadingData";

import { wait } from "./Utils";

import { Screen } from "./type/onboardingType";

import backgroundJourney from "./assets/background-journey.png";

const screenMap: Record<Screen, any> = {
  OnboardingNameScreen: OnboardingNameScreen,
  OnboardingGenderScreen: OnboardingGenderScreen,
  OnboardingDateOfBirthScreen: OnboardingDateOfBirthScreen,
  OnboardingCategoryScreen: OnboardingCategoryScreen,
  OnboardingGenresScreen: OnboardingGenresScreen,
  OnboardingNotifScreen: OnboardingNotifScreen,
  OnboardingWhereInfoScreen: OnboardingWhereInfoScreen,
};

const OnboardingNavigator = () => {
  const { currentScreen, goNext, goPrev, data, setField, resetOnboarding } = useOnboardingData();
  const [on, setOn] = useState(false);

  useEffect(() => {
    wait(300).then(() => setOn(true));
  }, []);

  const ScreenComponent = screenMap[currentScreen];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="bg-[#6C4E9A] min-h-screen max-w-full sm:max-w-[500px] w-full p-4 bg-no-repeat bg-contain relative"
        style={{ backgroundImage: `url(${backgroundJourney})` }}
      >
        {on && <ProgressBar data={data} />}
        {ScreenComponent ? (
          <ScreenComponent
            onNext={currentScreen === "OnboardingWhereInfoScreen" ? () => console.log("Onboarding Complete!") : goNext}
            onPrev={goPrev}
            data={data}
            setField={setField}
            resetOnboarding={resetOnboarding}
          />
        ) : null}
      </div>
    </div>
  );
};

export default OnboardingNavigator;
