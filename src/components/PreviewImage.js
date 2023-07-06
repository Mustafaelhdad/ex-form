import { useState } from "react";

export default function PreviewImage({ style, file }) {
  const [preview, setPreview] = useState({});

  if (file) {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => {
      setPreview(render.result);
    };
  }

  return (
    <div className="text-center">
      <img
        style={{ width: "300px", height: "200px" }}
        src={preview}
        alt="image preview"
      />
    </div>
  );
}
