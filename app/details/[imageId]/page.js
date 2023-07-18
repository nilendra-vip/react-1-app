"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { use, useState } from "react";

async function GetDetails(imageId) {
  try {
    const { data } = await axios.get(
      `https://picsum.photos/id/${imageId}/info`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

const Details = () => {
  const { imageId } = useParams();
  const [imgDets, setImgDets] = useState(use(GetDetails(imageId)));

  return (
    <div>
      <h1>Details</h1>
      <hr />
      <img src={imgDets && imgDets.download_url} height={200} alt="" />
      <p>{imgDets.author}</p>
    </div>
  );
};

export default Details;
