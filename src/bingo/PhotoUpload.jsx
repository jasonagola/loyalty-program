import React, { useState } from 'react';
import { uploadPost } from '../api/postsAPI';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth';

function PhotoUpload() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const axiosPrivate = useAxiosPrivate()
  const auth = useAuth()

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each selected file to the formData object
    for (let i = 0; i < selectedFiles.length; i++) {
      //??Change Name of Photo??
      formData.append(`photo-${i}`, selectedFiles[i]);
    }
    
    //attach current User to form Data
    formData.append('username', auth.username)

    // Send the formData via a POST request to the backend
    const response = await uploadPost(formData, axiosPrivate)
    try {
      console.log('Submitted')
    } catch(error) {
      console.log(error)
    }
  //   fetch('/api/upload-photos', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Upload successful:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading photos:', error);
  //     });
  // };

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="photo-upload">Select photo to upload:</label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default PhotoUpload;