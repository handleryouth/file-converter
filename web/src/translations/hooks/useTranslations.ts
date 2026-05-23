import { useCallback } from "react";
import { useTranslation as useNativeTranslation } from "react-i18next";
import type { StrictTranslationPath } from "../i18nType";

export function useTranslation() {
  const { t, ...rest } = useNativeTranslation();

  const translate = useCallback(
    (input: StrictTranslationPath) => {
      return t(input);
    },
    [t],
  );

  return { translate, ...rest };
}
