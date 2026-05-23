export interface ITranslationSchema {
  common: {
    buttons: {
      save: string;
      cancel: string;
      file: string;
    };
    image: string;
    video: string;
  };
  input: {
    put_image: string;
  };
  page: {
    home: string;
    about: string;
  };
}

export const createTranslation = <T extends ITranslationSchema>(dict: T) =>
  dict;

type DeepKeys<T, Delimiter extends string = "."> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}${Delimiter}${DeepKeys<T[K], Delimiter>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type StrictTranslationPath = DeepKeys<ITranslationSchema, ".">;
