import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  const { description } = req.body;

  try {
    const createdRecords = await table.create([{ fields: { description } }]);

    const createRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };

    res.statusCode = 200;
    res.json(createRecord);
  } catch (error) {
    throw error;
  }
};
