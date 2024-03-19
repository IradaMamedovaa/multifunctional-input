import { create } from "zustand";

const useFormulaStore = create((set) => ({
  formula: [],
  cursorPosition: 0,
  updateFormula: (value) => set({ formula: value }),
  updateCursorPosition: (position) => set({ cursorPosition: position }),
}));

export default useFormulaStore;
