import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null)
    const types = ["image/jpeg"];

    const selectedImg = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            let selected = e.target.files[i];
            if (selected && types.includes(selected.type)) {
                setFiles([...e.target.files]);
                setError("");
            } else {
                setFiles([]);
                setError("Please select .jpeg image file");
            }
        }
    }
    return (
        <form className="upload">
            <label>
                <input type="file" multiple onChange={selectedImg} />
                <FontAwesomeIcon icon={faPlusCircle} />
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {files && <ProgressBar files={files} />} 
            </div>
        </form>
    );
}

export default UploadForm;
