import auth0 from "../utils/auth0";
import { table } from "../utils/Airtable";

/**
  trigger this
  export default OwnsRecord(handler)
  Flow:
  1. OwnsRecord
  2. Pass req and res from auth0 to handler function
  3. return handler()
  4. trigger handler()
  它就和 HOC 一樣
  handler = originalComponent
  然後 這個 function 是 處理 originalComponent render前 讓有middleware的概念 才 去 render component
 */

const OwnsRecord = (handler) =>
  auth0.requireAuthentication(async (req, res) => {
    const { user } = await auth0.getSession(req);
    const { id } = req.body;
    console.log("in OwnsRecord.js");
    try {
      const existingRecord = await table.find(id);
      if (!existingRecord || user.sub !== existingRecord.fields.userId) {
        res.statusCode = 404;
        return res.json({ msg: "Record not found" });
      }
      // req.record = existingRecord;

      return handler(req, res);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ msg: "Somethime went wrong" });
    }
  });

export default OwnsRecord;
