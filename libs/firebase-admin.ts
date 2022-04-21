import { cert, initializeApp, getApps } from "firebase-admin/app";

const serviceAccount = {
  projectId: "snippet-377eb",
  clientEmail: "firebase-adminsdk-drt8j@snippet-377eb.iam.gserviceaccount.com",
  privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDPDTq3sHIasr1w\nxuVVA2PFJC/ONUmbZjJvfhN06xlMlJivlLcD7oj4rQ/zqR7bujd+XB4T+Girbg+a\nhYbldiRoCoHgJcLDm5TVq3gSOOAqD7nxJqABuwkLJ2tJGUBkPocqzif/pgU/Ree0\ntlwUboGUl2QLRkLMI0P7FakEsQ1WGmV4972L90phq+I9hnpnAjjDrJc/a553QT1O\nW4MzWnDdejYZZgMYS0+Ffpp3NlP6aC90eVS9lBbz0RjsMe6pCF0IPhq0EuEDW888\nKTPr0L1qIavaMUEa1MCatCwY7eZzGeb9B91NqPxiR4ngkjNYaQ6o+qcjh7Stvv3C\nsIeXRKyDAgMBAAECggEAQEN15w9/yuORQtCo22MK82RQ5irJ5s6odsxl05Morgks\n/sokp7bAkpZ8bf8e0coRcUm8GCywqAyoESjCfrPVhulD+EMgGUBPyKXIxbcbdFKf\nPsbjQMZBf1HDzdNllfeGUnXcGk/4LvROf1teZwUJeQooBgvPrbaAYg0OAaPGZOOL\nWD67dKvQPcsDIVVOyIxbqu5gcuYiNfzw2X4xPf2nbv3Xx+Lu7xoJbX7R8KSDZDgZ\n2YvBNiLTcArfndHicGud2IxR/8zUN2LzfvAoQfcrAo9Twn8D+yoZPSaE+W+Z+ArG\nNChY9SCfxt093P8BCMoc2zAd2L3GTcQrbh1EYBOVaQKBgQDzmngGXPoKQxoNzcrF\nLybbGw60q4o6A7I2QeK7XFCuEW+fRaJHWY8SxXoBpQIQBW28cT1ozgpSjLrpNupG\nCeFUt/OAZqu9SjLIpAK5Du1xM1DJSh0gV3Eck0+1ITb5HmIsFZuR64Wxe7ZkLsOa\nOw1sioj2aSa9SbCk+Xg6vh3S3wKBgQDZlpW3+KrN8w8EmLSyQy6XK54oPAbiCi3Y\nUEgQ2H/U/Mf9cIUCiaANSKRjdzftaQ9diKT83U0pQ43aUeYubQ/SVSwm15sENOkb\nHCaKV2OUyPqQW2lWfPXQt3C4qgFDmIszJVyMdOIAKYvdY2oD2q21DmKs7dUt940a\nzJv1PKCe3QKBgQCmP4cmIJHsKvs+7HEzvQgxg/e3SVKeYSNgb/qCj2/oO7IH6ofj\nVbWUw/yN3sTXljzb3BRi0CqvR6fPvVCI1/lVzex6dpdCKb8auwO4s/1Lwg+iL9hM\n2CAztj0xiidwQFITb/Op1Ch7hchl+pw3R5HTv3/VWtG7YO0SycZJoLHN1QKBgQC1\nj9/ymX79R1o6vanaLhEMd4sLi7s6lr/Whnb8B4vzj9LZejCjA3AYZYs2rF5wrn/x\nznnNvmQKkKInkLt/9eWD3ypuZu6lPfldc8n9GhqwJlxeZMirMK51sPxQOxu+6eUN\nkpl9YnLLK9/XpoLqIGlecViJcBO4vZ5yxFVG94YXyQKBgQCsiyJT6mxrWXz/mvTD\nZfMd5my3yNgIq8OFn/eT4YwbrCoBAqYdqH4CA9qNC+81W9cgcaC6yt00HEfl3Ws4\n/0YEIAOu/LqGSX/X8TN91VU9XtfhX2iVEZm8oE8K/H9EfxxIkRia4T6SEpKF314U\nHmRwmgsPNjxX3W/E23wUq6eVnQ==\n-----END PRIVATE KEY-----\n`,
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
