import React, { useState } from "react";
import { convertsTobase4 } from "../function/funtionpie";
const Cours = () => {
  const [image, setImage] = useState();
  const handlFile = async (e) => {
    const file = e.target.files[0];
    const fileChange = await convertsTobase4(file);
    setImage(fileChange);
    console.log(fileChange);
  };

  return (
    <div>
      <input
        type="file"
        id="imageInput"
        name="images[]"
        accept="image/*"
        onChange={(e) => handlFile(e)}
        multiple
      />
      <div>Preview</div>
      <img src={image} width={80} height={80} />

      <button type="submit">Upload</button>
    </div>
  );
};

export default Cours;
