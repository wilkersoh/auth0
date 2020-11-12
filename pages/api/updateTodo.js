import { table, minifyRecords } from "./utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;

  try {
    // throw Error("failed to update");
    const updateRecord = await table.update([{ id, fields }]);

    res.statusCode = 201;
    res.json(minifyRecords(updateRecord));
  } catch (error) {
    console.log(error);
    res.statusCode = 401;
    res.json("Failed to updated.");
  }
};
