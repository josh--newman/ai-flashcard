import { cloneDeepWith } from "lodash";

export const serializedObject = <T>(obj: T): T => {
  const result = cloneDeepWith<T>(obj, (value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
  });

  return result;
};
