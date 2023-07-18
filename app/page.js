"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';


export default function Home() {
  const totalPage = 100 ;
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([]);

  const GetImages = async () => {
    try {
      const { data } = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handlePageClick = (e)=>{
    setPage(e.selected + 1)
  }

  useEffect(() => {
    GetImages();
    console.log(page)
  }, [page]);

  return (
    <div className="container pt-3 text-center">
      <h1>Images Collection</h1>
      <br />
      <ul className="d-flex flex-wrap gap-3 bg-secondary-subtle  imagesContainer pt-5 ps-5">
        {images
          ? images.map((image, id) => {
              return (
                <li key={image.id}>
                  <img src={image.download_url} height={150} width={220} alt="sss" />
                  <br />
                  <Link href={`/details/${image.id}`}>{image.author}</Link>
                </li>
              );
            })
          : "loading..."}
      </ul>
      <br />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName={page > 1 ? "page-item" : "d-none"}
        previousLinkClassName="page-link"
        nextClassName={page < totalPage ? "page-item" : "d-none"}
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
