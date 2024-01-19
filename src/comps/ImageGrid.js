import React, { useCallback, useEffect, useRef, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";


const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore("images"); 

    // Variables for img lazy loading using IntersectionObserver:
    const [page, setPage] = useState(8);
    let pageRef = useRef({});
    const loader = useRef(null);

    pageRef.current = page;

    // Function to load more img:
    const lastImg = useCallback((entries) => {
        if (entries[0].isIntersecting) {
            setPage((page) => page + 4);
        }
    }, []);

     // Function to observe selected div and call load funcion:
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            treshold: 0
        };
        const observer = new IntersectionObserver(lastImg, option);
        if (loader.current) observer.observe(loader.current);
    },[lastImg]);

    // Button to load more photos if observer did't observe:
    let arr = [];

    const loadMore = (e) => {
        e.preventDefault();
        setPage((page) => page + 4);
    };

    const setArr = (x) => {
        arr.push(x);
    };

    // Funcion to get img from firebase:
    const loadingImgGrid = () => {
       return docs.slice(0, pageRef.current).map(doc => (
            <motion.div layout className="img-wrap" key={doc.id}
             whileHover={{filter: 'none'}}
             onClick={() => setSelectedImg(doc.adress)}
             setArr={setArr(doc.id)} >
                <img src={doc.adress} alt="uploaded img"></img>
            </motion.div>
        ))
    };

    return (
        <div className="img-grid" >
            {docs && loadingImgGrid()}
            <div ref={loader}></div>
            {docs && arr.length !== docs.length && 
            <div className="load-div">
                <button className="load-btn" onClick={loadMore}>More...</button>
            </div>}
        </div>
    )
}

export default ImageGrid;