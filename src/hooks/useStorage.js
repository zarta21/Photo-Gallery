import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [urls, setUrls] = useState(null);

    useEffect(() => {
        const storageRef = ref(projectStorage, file.name);
        const upload = uploadBytesResumable(storageRef, file);
        const collectionRef = collection(projectFirestore, "images");

        upload.on("state_changed", (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
               const urls = await getDownloadURL(upload.snapshot.ref)
                let token = urls;

            addDoc(collectionRef, {
                createdAt: serverTimestamp(),
                adress: token
            });

            setUrls(prevState) => [...prevState, urls]);
        })
    }, [file])

    return {progress, urls, error}
}

export default useStorage;
