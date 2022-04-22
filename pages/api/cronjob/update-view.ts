import { NextApiRequest, NextApiResponse } from "next";
import "../../../libs/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { ISnippet } from "../../../services/snippet";
import { logtail } from "../../../libs/log";

interface ISnippetCounter {
  [key: string]: {
    viewIds: string[];
    totalView: number;
  };
}

type FirebaseDoc =
  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

function log(content: string) {
  console.log(content);
  logtail.info(content);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "POST method required" });
    return;
  }

  const { authorization } = req.headers;
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(500).json({ message: "Authentication errors" });
    return;
  }

  const firestore = getFirestore();
  const viewRef = firestore
    .collection("views")
    .where("done", "==", false)
    .limit(500);

  viewRef
    .get()
    .then(async (snapshot) => {
      const groupSnippets: ISnippetCounter = {};
      const snippets: string[] = [];

      if (snapshot.empty) {
        log("No views available");
        res.status(200).json({ message: "No views available" });
        return;
      }

      snapshot.forEach((d) => {
        const data = d.data();
        const snippetId = data.snippetId;

        if (!groupSnippets[snippetId]) {
          snippets.push(snippetId);
          groupSnippets[snippetId] = {
            viewIds: [],
            totalView: 0,
          };
        }

        groupSnippets[snippetId].totalView += 1;
        groupSnippets[snippetId].viewIds.push(d.id);
      });

      const total = snippets.length;
      snippets.forEach(async (snippet, index) => {
        try {
          await firestore.runTransaction(async (transaction) => {
            log(`=> ${index + 1}/${total} Update view of snippets/${snippet}`);

            const groupSnippetItem = groupSnippets[snippet];
            const snippetRef = await transaction.get(
              firestore.doc(`snippets/${snippet}`)
            );

            if (!snippetRef.exists) {
              // throw `Document snippets/${snippet} does not exist!`;
              log(`Document snippets/${snippet} does not exist!`);
              return;
            }

            const snippetData = snippetRef.data() as ISnippet;
            const newTotalView = groupSnippetItem.totalView;
            const viewIdOfSnippet = groupSnippetItem.viewIds;
            const oldView = snippetData.view || 0;

            log(`Update total view in snippets/${snippet}`);

            transaction.update(snippetRef.ref, {
              view: newTotalView + oldView,
            });

            log(`Mark view as done`);
            viewIdOfSnippet.forEach(async (viewId) => {
              await transaction.update(firestore.doc(`views/${viewId}`), {
                done: true,
              });
            });
          });
        } catch (error) {
          log(
            `=> ${index + 1}/${total} Update view of snippets/${snippet} ERROR`
          );
        }
      });

      res.status(200).json({ message: "Success" });
    })
    .then()
    .catch((err) => {
      log("Get views ERROR");
      res.status(500).json({ message: err });
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
