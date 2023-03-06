import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";




const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyAveKCJNuB7u6z2KRNj9PgdAyv7jixZqc4",
  authDomain: "img-url-f2634.firebaseapp.com",
  projectId: "img-url-f2634",
  storageBucket: "img-url-f2634.appspot.com",
  messagingSenderId: "203854850592",
  appId: "1:203854850592:web:04cbf11f452e65b2e8aa45"
};



if (!(firebase as any).apps.length) {
  firebase.initializeApp(firebaseConfig);
}




//  const storage = firebase.storage();

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();
      setUrl(fileUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <p>File URL: {url}</p>}
    </div>
  );
};

export default App;
