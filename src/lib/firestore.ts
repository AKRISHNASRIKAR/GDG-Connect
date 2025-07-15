// lib/firestore.ts
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  
  orderBy,

} from "firebase/firestore";

// Get all calls for generateStaticParams and general use
export async function getAllCalls() {
  try {
    const q = query(collection(db, "calls"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        ...data,
        postedDate: data.postedDate?.toDate?.() || new Date(),
        createdAt: data.createdAt?.toDate?.() || new Date(),
        deadline: data.deadline ? new Date(data.deadline) : null,
      };
    });
  } catch (error) {
    console.error("Error fetching all calls:", error);
    return [];
  }
}

// Get individual call by ID
export async function getCallById(id: string) {
  try {
    const docRef = doc(db, "calls", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        ...data,
        postedDate: data.postedDate?.toDate?.() || new Date(),
        createdAt: data.createdAt?.toDate?.() || new Date(),
        deadline: data.deadline ? new Date(data.deadline) : null,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching call:", error);
    return null;
  }
}
