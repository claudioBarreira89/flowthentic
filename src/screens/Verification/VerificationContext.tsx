import React, { createContext, useContext, useState } from "react";

type VerificationState = {
  name: string;
  birthDate: Date;
  email: string;
  image: string; // Base64-encoded image
};

const VerificationContext = createContext<{
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  verificationState: VerificationState;
  setVerificationState: React.Dispatch<React.SetStateAction<VerificationState>>;
}>({
  currentStep: 0,
  setCurrentStep: () => {},
  verificationState: {
    name: "",
    birthDate: new Date(),
    email: "",
    image: "",
  },
  setVerificationState: () => {},
});

export const useVerificationState = () => useContext(VerificationContext);

export const VerificationProvider: React.FC<any> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      name: "",
      birthDate: new Date(),
      email: "",
      image: "",
    }
  );

  return (
    <VerificationContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        verificationState,
        setVerificationState,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
