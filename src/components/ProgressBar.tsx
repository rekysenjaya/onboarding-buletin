import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ data }) => {
  const lastPage = data.step
  let executePage = lastPage;
  if ((lastPage - 1) === data.lastStep) executePage = data.lastStep + 1;

  const totalWidth = 100; // contoh width container
  const widthPerPage = totalWidth / 7;

  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(widthPerPage * lastPage, 100 / lastPage);

      setBarWidth(widthPerPage * lastPage);
    }, 100);
    return () => clearTimeout(timer);
  }, [lastPage]);

  return (
    <div className="">
      <div className="bg-white rounded-md mb-4" style={{ width: `calc(100vw - 2rem)`, maxWidth: `calc(500px - 2rem)` }}>
        <motion.div
          className="bg-[#FCD942] h-1 rounded-md"
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default ProgressBar