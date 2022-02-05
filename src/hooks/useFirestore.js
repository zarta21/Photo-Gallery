import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {useState, useEffect} from 'react';
import {projectFirestore} from "../firebase/config";

const useFirestore = (img) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const colRef = collection(projectFirestore, img);
        const q = query(colRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snap) => {
            let documents = [];
            snap.docs.forEach(doc => {
                documents.push({...doc.data(), id: doc.id});
            });
            setDocs(documents);
        })
    }, [img])

    return {docs}
}

export default useFirestore;
