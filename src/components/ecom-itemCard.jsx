import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createRef } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EcommItemCard({ product, index }) {
  const notedit = "00000";
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(true);
  const [outlined, setOutlined] = useState("none");

  // const [bg, setBg] = useState("bg-yellow-400");
  // const [click, setClick] = useState(false);

  // useEffect(() => {
  //   console.log("click :: ", click);
  //   console.log("bg :: ", bg);
  //   setClick(false);
  //   if (click) {
  //     setBg("bg-orange-400");
  //   } else {
  //     setBg("bg-yellow-500");
  //   }
  // }, [click]);

  const handleDeleteClick = (index) => {
    dispatch({ type: "products/deleteProduct", payload: index });
    toast.error("Product Deleted Successfully!");
  };

  const handleSaveClick = (index) => {
    const title = document.getElementById(`${index}name`);
    const price = document.getElementById(`${index}price`);
    const rate = document.getElementById(`${index}rate`);
    const description = document.getElementById(`${index}description`);

    const updatedProduct = {
      title: title.value,
      price: parseInt(price.value),
      rating: {
        rate: rate.value,
        count: 0,
      },
      description: description.value,
      image: product.image,
    };

    dispatch({
      type: "products/editProduct",
      payload: { index, updatedProduct },
    });
    setEdit(false);
    toast.success("Product Updated Successfully!");
  };

  const handleEditClick = (index) => {
    setEditMode(!editMode);
    if (editMode) {
      setOutlined("2");
    } else {
      setOutlined("none");
    }
  };

  return (
    <>
      <div
        key={index}
        id={index}
        className="flex  w-5/6 h-32 bg-white m-2 p-4 items-center  justify-between "
      >
        {/* 1st part of div list */}
        <div className="w-1/2 flex flex-row bg- space-x-8 ">
          <img src={product.image} className="w-24 h-24 " alt="product" />

          {/* Actual Part */}
          <div className={`space-y-4  ${notedit}`}>
            <div>
              <input
                // value={editMode ? product.title : undefined}
                // defaultValue={editMode ? undefined : product.title}
                defaultValue={product.title}
                readOnly={editMode}
                className={`font-semibold bg-transparent border-${outlined} focus:outline-none `} //disabled
              />
              <p>
                Rs.{" "}
                <input
                  value={product.price}
                  readOnly={editMode}
                  className={`border-${outlined} focus:outline-none w-2/5  `}
                />
              </p>
            </div>

            {editMode ? (
              <div className="flex">
                {Array(Math.floor(product.rating.rate))
                  .fill()
                  .map((_, index) => (
                    <FaStar key={index} className="text-yellow-300" />
                  ))}

                {Array(5 - Math.floor(product.rating.rate))
                  .fill()
                  .map((_, index) => (
                    <FaStar key={index} className="text-gray-500" />
                  ))}
              </div>
            ) : (
              <div className="flex">
                <p>
                  <input
                    defaultValue={product.rating.rate}
                    className="w-10 border-2 "
                    id={`${index}rate`}
                  />
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2nd part of div list */}
        <div className="w-1/2 flex flex-row bg- pr-8  text-justify ">
          {/*Actual Part  */}
          <div className="space-y-3 w-full  h-24">
            <textarea
              value={product.description}
              readOnly={editMode}
              className={`bg-transparent border-${outlined} w-full h-16 resize-none focus:outline-none`}
            />

            {editMode ? (
              <div className="flex flex-row justify-end  space-x-3 ">
                <MdEdit
                  size={22}
                  className="text-yellow-600 cursor-pointer"
                  onClick={() => handleEditClick(index)}
                />
                <MdDeleteForever
                  size={22}
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDeleteClick(index)}
                />
              </div>
            ) : (
              <div className="flex flex-row justify-end space-x-4 ">
                <button
                  className="bg-gray-500 text-white px-2 py-1  hover:bg-gray-400 rounded-md"
                  onClick={() => handleEditClick(index)}
                >
                  Cancel
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 hover:bg-gray-400 rounded-md"
                  // className={bg}
                  // onClick={() => setClick(!click)}
                  onClick={() => handleSaveClick(index)}
                >
                  Save Click it
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
