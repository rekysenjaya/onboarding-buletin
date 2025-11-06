export type Screen =
  | "OnboardingNameScreen"
  | "OnboardingGenderScreen"
  | "OnboardingDateOfBirthScreen"
  | "OnboardingCategoryScreen"
  | "OnboardingGenresScreen"
  | "OnboardingNotifScreen"
  | "OnboardingWhereInfoScreen";

export type OnboardingData = {
  step: number;
  lastStep: number | null;
  [key: string]: any;
};

export interface ScreenComponentProps {
  onNext: () => void;
  onPrev: () => void;
  data: OnboardingData;
  setField: (key: string, value: any) => void;
}