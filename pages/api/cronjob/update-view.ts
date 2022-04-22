import { NextApiRequest, NextApiResponse } from "next";
import "../../../libs/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

interface ISnippetCounter {
  [key: string]: number;
}

type FirebaseDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const firestore = getFirestore();
  const doc = firestore.doc;
  const runTransaction = firestore.runTransaction;
  const viewRef = firestore
    .collection("views")
    .where("done", "==", false)
    .limit(500);

  viewRef
    .get()
    .then(async (snapshot) => {
      const counter: ISnippetCounter = {};
      const snippets: string[] = [];

      snapshot.forEach((d) => {
        const data = d.data();
        const snippetId = data.snippetId;

        if (!counter[snippetId]) {
          snippets.push(snippetId);
          counter[snippetId] = 0;
        }
        counter[snippetId] += 1;
      });

      // console.log("counter", counter);
      // console.log("snippets", snippets);

      try {
        await runTransaction(async (transaction) => {
          const dt = await transaction.get(doc("views/6LZig56RsFoiyyoiNIYJ"));
          console.log(dt.data());
        });
      } catch (error) {
        console.log(error);
      }

      res.status(200).json({ method: "GET", success: true });

      // try {
      //   await runTransaction(async (transaction) => {
      //     console.log('111')
      //     // snippets.forEach(async (snippet) => {
      //     //   console.log('snippet', snippet)
      //       // const resDoc = await transaction.get(doc("views", snippet));

      //       // console.log(resDoc.data());
      //     // });
      //   });
      //   res.status(200).json({ method: "GET", success: true });
      // } catch (error) {
      //   console.log("error transaction", error);
      // }
    })
    .then()
    .catch((err) => {
      res.status(500).json({ method: "GET", code: 500, success: false });
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
