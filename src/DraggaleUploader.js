import React from 'react'

export default function DraggaleUploader() {
    function onFileLoad(){

    }
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className="sub-header">
                Drag an Image
            </div>
            <div className="draggable-container">
                <input type="file"
                       id="file-browser-input"
                       name="file-browser-input"
                       ref={input=> fileInput=input}
                       onDragOver={(e) => {e.preventDefault(); e.stopPropagation();}}
                       onDrop={onFileLoad(e.taregt.value)}
                       onChange={onFileLoad(e.taregt.value)}/>
                <div className="file-preview-container">
                    
                </div>
            </div>
        </div>
    )
}
