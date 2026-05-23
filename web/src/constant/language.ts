export interface SelectLanguageProps {
  id: string;
  title: string;
  value: string;
}

export const LANGUAGE_SELECTION = [
  {
    id: "1",
    title: "English",
    value: "en",
  },
  {
    id: "2",
    title: "Indonesia",
    value: "id",
  },
] as const satisfies SelectLanguageProps[];

export type ValueLanguage = (typeof LANGUAGE_SELECTION)[number]["value"];
