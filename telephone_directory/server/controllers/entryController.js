import Entry from "../models/entry.js";

const createNewEntry = async ({ name, number }) => {
  const newEntry = new Entry({ name, number });

  const entry = await newEntry.save();
  return entry;
};

const findAllEntries = async () => {
  const entries = await Entry.find({});
  return entries;
};

const findByName = async (findName) => {
  const entry = await Entry.find({ name: findName });
  return entry;
};

const findEntryById = async (entryId) => {
  const entry = await Entry.findById(entryId);
  return entry;
};

const deleteEntry = async (entryId) => {
  const response = await Entry.findByIdAndRemove(entryId);
  return response;
};

const updateEntry = async (entryId, entry) => {
  const updatedEntry = await Entry.findByIdAndUpdate(entryId, entry, {
    new: true,
    runValidators: true,
  });
  return updatedEntry;
};

export {
  createNewEntry,
  findAllEntries,
  findEntryById,
  findByName,
  deleteEntry,
  updateEntry,
};
