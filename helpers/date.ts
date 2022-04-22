import { Timestamp } from 'firebase/firestore'

export const nowTimeStamp = (): Timestamp => {
  return Timestamp.fromDate(new Date())
}
