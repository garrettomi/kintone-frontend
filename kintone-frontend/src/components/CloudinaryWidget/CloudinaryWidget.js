import { useState, useEffect } from "react";
import "./Cloudinary.css";

const CloudinaryWidget = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Load the Cloudinary Upload Widget script
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the Upload Widget when the script is loaded
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.REACT_APP_CLOUDINARY_USERNAME,
          uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.secure_url);
            // Now you can use the image URL in your application
          }
        }
      );
      // Open the Upload Widget when the button is clicked
      document
        .getElementById("upload_widget_opener")
        .addEventListener("click", () => {
          widget.open();
        });
    };

    return () => {
      // Clean up the script element when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <button id="upload_widget_opener">Upload Image</button>
      {imageUrl && (
        <img src={imageUrl} className="cloudinaryImage" alt="Uploaded" />
      )}
    </div>
  );
};

export default CloudinaryWidget;
