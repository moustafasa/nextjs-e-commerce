"use client";
import { useContext } from "react";
import { settingsLayoutErrorsContext } from "./settingsLayoutErrorContext";

export default function useSettingsLayoutErrors() {
  const errors = useContext(settingsLayoutErrorsContext);
  return errors;
}
