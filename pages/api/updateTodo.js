import { table, minifyRecords } from "./utils/Airtable";
import OwnsRecord from "./middleware/OwnsRecord";

const handler = async (req, res) => {
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

export default OwnsRecord(handler);
