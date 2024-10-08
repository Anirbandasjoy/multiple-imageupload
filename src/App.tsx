import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

const uploadImage = async (image: File) => {
  const apiKey = "6e1db85f6ab88ea2edc5847ca2be6134";
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.data.display_url;
};

const App = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChage = (e: any) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // upload images funtion

  const handleUploadImages = async () => {
    setLoading(true);
    const imageUrls: string[] = [];

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const url = await uploadImage(imageFiles[i]);
        imageUrls.push(url);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setImageUrls(imageUrls);
    setLoading(false);
  };

  console.log(imageUrls);
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Multiple image upload</h1>
        <div>
          <input type="file" multiple onChange={handleImageChage} />
        </div>
        <h2>Selected image</h2>
        <div style={{ display: "flex", flex: "wrap", gap: 5 }}>
          {imageFiles?.map((image, index) => (
            <div key={index} style={{ height: "150px", width: "150px" }}>
              <img
                src={URL.createObjectURL(image)}
                alt="images"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          disabled={loading || imageFiles?.length === 0}
          onClick={handleUploadImages}
          style={{ marginTop: "10px", cursor: "pointer" }}
        >
          {loading ? "Uploading..." : "Upload images"}
        </button>
        <div>
          <h2>Uploaded Images</h2>
          <div style={{ display: "flex", flex: "wrap", gap: 5 }}>
            {imageUrls?.map((image, index) => (
              <div key={index} style={{ height: "150px", width: "150px" }}>
                <img
                  src={image}
                  alt="images"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
