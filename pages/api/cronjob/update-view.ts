import { NextApiRequest, NextApiResponse } from "next";
import "../../../libs/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const firestore = getFirestore();

  const viewRef = firestore.collection("views");

  viewRef
    .get()
    .then((snapshot) => {
      const dt = [];
      snapshot.forEach((doc) => {
        dt.push(doc.data());
        console.log(doc.id, "=>", doc.data());
      });

      res.status(200).json({ method: "GET", success: true, datas: dt });
    })
    .catch((err) => {
      res.status(500).json({ method: "GET", success: true });
    });

  // if (req.method === "POST") {
  //   try {
  //     // const { authorization } = req.headers;
  //     // if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
  //     //   res.status(200).json({ success: true });
  //     // } else {
  //     //   res.status(401).json({ success: false });
  //     // }
  //   } catch (err) {
  //     res.status(500).json({ statusCode: 500, message: err.message });
  //   }
  // } else {
  //   res.status(200).json({ method: "GET", success: true });
  //   // res.setHeader('Allow', 'POST');
  //   // res.status(405).end('Method Not Allowed');
  // }
}
