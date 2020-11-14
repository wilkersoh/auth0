import { table, minifyRecords } from "./utils/Airtable";
import auth0 from "./utils/auth0";

export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession();

  try {
    const records = await table
      .select({
        filterByFormula: `userId ='${user.sub}'`, // filter the record only match the user
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (error) {
    throw error;
  }
});
