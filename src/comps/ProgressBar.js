import React from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({files}) => {
    const {progress} = useStorage(files);

    return (
        <div className="bar">
            {progress < 100 && <div className="progress-bar" style={{width: progress + "%"}} />}           
        </div>
    )
}

export default ProgressBar;