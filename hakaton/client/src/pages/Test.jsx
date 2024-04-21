import React from "react";
import { convertsTobase4 } from "../function/funtionpie";
const Test = () => {
  const [image, setImage] = useState();
  const handlFile = async (e) => {
    const file = e.target.files[0];
    const fileChange = convertsTobase4(file);
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
      <div id="preview"></div>
      <button type="submit">Upload</button>
    </div>
  );
};

export default Test;
