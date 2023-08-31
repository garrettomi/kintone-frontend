import { useEffect } from "react";
import "./Cloudinary.css";

const CloudinaryWidget = ({ imageUrl, setImageUrl }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.REACT_APP_CLOUDINARY_USERNAME,
          uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.secure_url);
          } else {
            console.error("Error uploading image:", error);
          }
        }
      );

      document
        .getElementById("upload_widget_opener")
        .addEventListener("click", () => {
          widget.open();
        });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [setImageUrl]);

  return (
    <div className="cloudinary-widget">
      <button id="upload_widget_opener" className="upload-button">
        Upload Image
      </button>
      {imageUrl && (
        <img src={imageUrl} className="cloudinaryImage" alt="Uploaded" />
      )}
    </div>
  );
};

export default CloudinaryWidget;
