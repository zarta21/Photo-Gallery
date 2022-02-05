import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import useFirestore from "../hooks/useFirestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Modal = ({selectedImg, setSelectedImg}) => {
    const {docs} = useFirestore("images");
    const [imgIndex, setImgIndex] = useState(0);    
    const [counter, setCounter] = useState(0);    
    const img = document.getElementById('myimg');
    
    let imgArr = docs.map(doc => (doc.adress));

    const nextImg = () => {
        let index = imgIndex;
        if (counter === 0) {
            if (imgArr.indexOf(selectedImg) !== imgArr.length - 1) {
                setImgIndex(imgIndex + imgArr.indexOf(selectedImg) + 1);
                setCounter(counter + 1);
                index = imgArr.indexOf(selectedImg) + 1
                img.setAttribute('src', imgArr[index]);
            } else {
                setImgIndex(0)
                setCounter(counter + 1)
                img.setAttribute('src', imgArr[0]);
            }
        } else {
            if (imgIndex !== imgArr.length - 1) {
                setImgIndex(imgIndex + 1)
                setCounter(counter + 1)
                index += 1
                img.setAttribute('src', imgArr[index]);
            } else if (imgIndex === imgArr.length - 1) {
                setImgIndex(0)
                setCounter(counter + 1)
                img.setAttribute('src', imgArr[0]);
            }
        }        
    };

    const prevImg = () => {
        let index = imgIndex;
        if (counter === 0) {
            if (imgArr.indexOf(selectedImg) !== 0) {
                setImgIndex(imgIndex + imgArr.indexOf(selectedImg) - 1);
                setCounter(counter + 1);
                index = imgArr.indexOf(selectedImg) - 1
                img.setAttribute('src', imgArr[index]);
            } else {
                setImgIndex(imgArr.length - 1);
                setCounter(counter + 1);
                index = imgArr.length - 1
                img.setAttribute('src', imgArr[index]);
            }
        } else {
            if (imgIndex !== 0) {
                setImgIndex(imgIndex - 1);
                setCounter(counter + 1)
                index -= 1
                img.setAttribute('src', imgArr[index]);
            } else if (imgIndex === 0) {
                setImgIndex(imgArr.length - 1);
                setCounter(counter + 1)
                index = imgArr.length - 1
                img.setAttribute('src', imgArr[index]);
            }
        }
    };

    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null)
        }
    }

    return (
        <AnimateSharedLayout type="crossfade">
            <motion.div className="backdrop" onClick={handleClick} >
                <img id="myimg" src={selectedImg} alt="full size" />
                <div className="next" onClick={nextImg}>
                    <FontAwesomeIcon className="fas fa-chevron-right" icon={faChevronRight} />
                </div>
                <div className="prev" onClick={prevImg}>
                    <FontAwesomeIcon className="fas fa-chevron-left" icon={faChevronLeft} />
                </div>
            </motion.div> 
        </AnimateSharedLayout>
        
    )
    
}

export default Modal;