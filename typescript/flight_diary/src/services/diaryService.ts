import diaries from "../data/entries";
//import diaryData from "../data/diaryEntries.json";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

//const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

// const getNonSensitiveEntries = (): Pick<
//   DiaryEntry,
//   "id" | "date" | "weather" | "visibility"
// >[] => {
//   // ...
// };

// const getNonSensitiveEntries = (): Omit<DiaryEntry, "comment">[] => {
//   // ...
// };

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
};
