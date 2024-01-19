import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import useFirestore from "../hooks/useFirestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useOnKeyPress } from "../hooks/useOnKeyPress";

const Modal = ({selectedImg, setSelectedImg}) => {
    const {docs} = useFirestore("images");
    const [imgIndex, setImgIndex] = useState(0);    
    const [counter, setCounter] = useState(0);    
    const img = document.getElementById('myimg');
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    
    let imgArr = docs.map(doc => (doc.adress)); 

    const closeModal = () => {
        setSelectedImg(null)
    };

    // Img slider functions:

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
                img.setAttribute('src', imgArr[0])
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


    // Key events:
    useOnKeyPress(nextImg, "ArrowRight")
    useOnKeyPress(prevImg, "ArrowLeft")
    useOnKeyPress(closeModal, "Escape")

    // Touch events:
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            nextImg();
        }

        if (touchStart - touchEnd < -75) {
            prevImg();
        }
    };

    // Function for closing modal:

    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null)
        }
    }

    // Download image:
    let fileName = docs.map(doc => (doc.id));
    const download = () => {
        const storage = getStorage();
        getDownloadURL(ref(storage, selectedImg))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName[imgIndex]}.jpeg`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <AnimateSharedLayout type="crossfade">
            <motion.div className="backdrop" onClick={handleClick}>
                <img id="myimg" src={selectedImg} alt="full size" 
                    onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} 
                    onTouchEnd={handleTouchEnd} />
                <div className="save" onClick={download} >
                        <FontAwesomeIcon className="fal fa-save" icon={faSave} />
                </div>
                <div className="close" onClick={closeModal} >
                    <FontAwesomeIcon className="fas fa-times" icon={faTimes} />
                </div>
                <div className="next" onClick={nextImg} >
                    <FontAwesomeIcon className="fas fa-chevron-right" icon={faChevronRight} />
                </div>
                <div className="prev" onClick={prevImg} >
                    <FontAwesomeIcon className="fas fa-chevron-left" icon={faChevronLeft} />
                </div>
            </motion.div> 
        </AnimateSharedLayout>
        
    )
    
}

export default Modal;