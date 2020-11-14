import { table, minifyRecords } from "./utils/Airtable";
import OwnsRecord from "./middleware/OwnsRecord";

const handler = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteRecord = await table.destroy([id]);

    res.statusCode = 200;
    res.json(minifyRecords(deleteRecord));
  } catch (error) {
    throw error;
  }
};

export default OwnsRecord(handler);
