import React from "react";
import { motion } from "framer-motion";

interface ButtonNextProps {
  actionPrev?: () => void;
  actionNext: () => void;
  readyNext?: boolean;
  loadingNext?: boolean;
}

const ButtonNext: React.FC<ButtonNextProps> = ({
  actionPrev,
  actionNext,
  readyNext = false,
  loadingNext = false,
}) => {
  return (<motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: .4, delay: 0.2, type: "spring" }}
    className="absolute bottom-4 left-0 w-full flex px-4">
      {/* Tombol Kembali */}
      {actionPrev && (
        <div className="flex-1 pr-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={actionPrev}
            className="w-full bg-gray-700 text-white font-semibold py-2 rounded-md"
          >
            Kembali
          </motion.button>
        </div>
      )}

      {/* Tombol Selanjutnya */}
      <div className="flex-1 pl-2">
        <motion.button
          whileTap={{ scale: readyNext ? 0.95 : 1 }}
          onClick={() => readyNext && actionNext()}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-md font-semibold ${
            readyNext ? "bg-[#FCD942] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {loadingNext ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Selanjutnya</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ButtonNext;
