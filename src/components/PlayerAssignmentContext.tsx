// PlayerAssignmentContext.tsx
import React, { createContext, useContext, useState } from "react";

type Assignment = {
  [positionIndex: number]: {
    id: string;
    name: string;
  };
};

interface ContextType {
  assignments: Assignment;
  assignPlayer: (
    positionIndex: number,
    player: { id: string; name: string }
  ) => void;
}

const PlayerAssignmentContext = createContext<ContextType | undefined>(
  undefined
);

export const PlayerAssignmentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [assignments, setAssignments] = useState<Assignment>({});

  const assignPlayer = (
    positionIndex: number,
    player: { id: string; name: string }
  ) => {
    setAssignments((prev) => ({ ...prev, [positionIndex]: player }));
  };

  return (
    <PlayerAssignmentContext.Provider value={{ assignments, assignPlayer }}>
      {children}
    </PlayerAssignmentContext.Provider>
  );
};

export const usePlayerAssignment = () => {
  const context = useContext(PlayerAssignmentContext);
  if (!context) {
    throw new Error(
      "usePlayerAssignment must be used within PlayerAssignmentProvider"
    );
  }
  return context;
};
