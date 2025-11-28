import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";
import Category from "@/db/models/Category"; //populate needs this

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const activities = await Activity.find().populate("categories"); // this line populates the categories

    response.status(200).json(activities);
    return;
  }

  response.status(405).json({ status: "Method not allowed." });
}
