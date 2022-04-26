import { NextApiRequest, NextApiResponse } from "next";
import "../../../libs/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { ISnippet } from "../../../services/snippet";
import { logtail } from "../../../libs/log";

interface ISnippetLoveCounter {
  [key: string]: {
    loveIds: string[];
    totalLove: number;
  };
}

function log(content: string) {
  console.log(`UPDATE-LOVE: ${content}`);
  logtail.info(`UPDATE-LOVE: ${content}`);
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

  try {
    const firestore = getFirestore();
    const loveRef = firestore
      .collection("loves")
      .where("done", "==", false)
      .limit(500);

    loveRef
      .get()
      .then(async (snapshot) => {
        const groupSnippets: ISnippetLoveCounter = {};
        const snippets: string[] = [];

        if (snapshot.empty) {
          log("No loves available");
          res.status(200).json({ message: "No loves available" });
          return;
        }

        log("Grouping snippet's loveIds + calculating total of love");
        snapshot.forEach((d) => {
          const data = d.data();
          const snippetId = data.snippetId;

          if (!groupSnippets[snippetId]) {
            snippets.push(snippetId);
            groupSnippets[snippetId] = {
              loveIds: [],
              totalLove: 0,
            };
          }

          groupSnippets[snippetId].totalLove += data.value;
          groupSnippets[snippetId].loveIds.push(d.id);
        });

        const total = snippets.length;

        log("Update all love's data to done + update total love into snippet");
        const snippetPromises = snippets.map(async (snippet, index) => {
          try {
            await firestore.runTransaction(async (transaction) => {
              log(
                `=> ${index + 1}/${total} Update love of snippets/${snippet}`
              );

              const groupSnippetItem = groupSnippets[snippet];
              const snippetRef = await transaction.get(
                firestore.doc(`snippets/${snippet}`)
              );

              if (!snippetRef.exists) {
                // throw `Document snippets/${snippet} does not exist!`;
                log(`Document snippets/${snippet} does not exist!`);
                return 0;
              }

              const snippetData = snippetRef.data() as ISnippet;
              const love = snippetData.love || 0;
              const newTotalLove = groupSnippetItem.totalLove;
              const viewIdOfSnippet = groupSnippetItem.loveIds;
              const oldLove = love >= 0 ? love : 0;
              const totalLove = newTotalLove + oldLove;

              log(`Update total view in snippets/${snippet}`);

              transaction.update(snippetRef.ref, {
                love: totalLove >= 0 ? totalLove : 0,
              });

              log(`Mark view as done`);
              const viewUpdatePromises = viewIdOfSnippet.map(async (viewId) => {
                await transaction.update(firestore.doc(`loves/${viewId}`), {
                  done: true,
                });
              });

              await Promise.all(viewUpdatePromises);
              return 1;
            });
          } catch (error) {
            log(
              `=> ${
                index + 1
              }/${total} Update view of snippets/${snippet} ERROR`
            );
            return 0;
          }
        });

        await Promise.all(snippetPromises);

        log("All update done");
        res.status(200).json({ message: "Success" });
      })
      .catch((err) => {
        log("Get loves ERROR");
        res.status(500).json({ message: err });
      });
  } catch (error) {
    console.log(error);
    log("Error when getting loves data");
  }
}
