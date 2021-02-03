import React, {useState} from 'react';
import './App.css';

function App() {
  const linkLat='';
  const linkLng='';
  const [post, setPost]=useState({
    title: '',
    description: '',
    photos: []
  });
  const [highlight, setHighlight] = useState(false);
  const {title, description, photos}=post;
  const handleChange=e=>{
    setPost({
      ...post,
      [e.taregt.name]: e.target.value
    })
  }
  const handleFileChange=e=>{
    let files=e.target.files;
    handFiles(files)
  }
  
  const handFiles=files=>{
    let photosArr=[];
    for(let file of files){
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', ()=>{
        let fileObject={
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result
        }
        photosArr.push(fileObject);
        setPost({
          ...post,
          photos: [...photos, ...photosArr]
        })
      })
    }
  }

  const handleDelete=e=>{
    let target=e.target.parentElement;
    let targetindex=target.dataset.imgindex*1;
    setPost({
      ...post,
      photos: [...photos.slice(0, targetindex), ...photos.slice(targetindex+1)]
    })
    }
  const handleHighlight=e=>{
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  }
  const handleUnhighlight=e=>{
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  }
  const handleDrop=e=>{
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    let dt=e.dataTransfer;
    let files=dt.files;
    handFiles(files);
  }
  return (
    <div className="app">
<div className="file-upload">
  <h2>Image Drag &amp; Drop &amp; Preview</h2>
  <form className encType="multipart/form-data">
    <div className="custom-form-group">
      <input type="text" name="title" placeholder="סתם שדה לדוגמא אובי:)" value={title} onChange={handleChange}/>
    </div>
    <div className="custom-form-group">
      <input type="text" name="desc" placeholder="עוד אחד:)" value={description} onChange={handleChange}/>
    </div>
    <div className="custom-form-group">
      <div className={highlight? "custom-file-drop-area highlight": "custom-file-drop-area"}
           onDragEnter={handleHighlight}
           onDragOver={handleHighlight}
           inDragLeave={handleUnhighlight}
           onDrop={handleDrop}>
        <input type="file" name="photos" placeholder="Enter photos" multiple="true" id="filephotos" onChange={handleFileChange}/>
        <label htmlFor="filephotos">Drag &amp; Drop</label>
      </div>
      <div className="custom-file-preview">
        {photos.length>0 && photos.map((item, index) =>(
        <div className="prev-img" key={index} data-imgindex={index}>
        <span onClick={handleDelete}>×</span>
        <img src={item.src} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
    <button type="submit" className="btn-submit">שליחה לא אמיתית:</button>
    <a href={`https://waze.com/ul?ll=${linkLat},${linkLng}&navigate=yes`}
       rel="noreferrer"
       target="_blank">
      Open in Waz
    </a>
  </form>
</div>

    </div>
  );
}

export default App;
