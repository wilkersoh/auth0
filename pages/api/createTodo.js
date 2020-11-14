import { table, minifyRecords } from "./utils/Airtable";
import auth0 from "./utils/auth0";

// reject not login just one hook auth0.requireAuthentication
export default auth0.requireAuthentication(async (req, res) => {
  const { description } = req.body;
  const { user } = await auth0.getSession(req);

  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } },
    ]);

    const createRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };

    res.statusCode = 200;
    res.json(createRecord);
  } catch (error) {
    throw error;
  }
});
