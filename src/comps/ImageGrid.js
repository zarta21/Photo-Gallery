import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";


const ImageGrid = ({setSelectedImg}) => {
    const {docs} = useFirestore("images");

    return (
        <div className="img-grid">
            {docs && docs.map(doc => (
                <motion.div layout className="img-wrap" key={doc.id}
                 whileHover={{opacity: 1}}
                 onClick={() => setSelectedImg(doc.adress)}>
                    <img src={doc.adress} alt="uploaded img"></img>
                </motion.div>
            ))}
        </div>
    )
}

export default ImageGrid;