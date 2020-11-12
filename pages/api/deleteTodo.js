import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  const { id } = req.body;

  try {
    const deleteRecord = await table.destroy([id]);

    res.statusCode = 200;
    res.json(minifyRecords(deleteRecord));
  } catch (error) {
    throw error;
  }
};
