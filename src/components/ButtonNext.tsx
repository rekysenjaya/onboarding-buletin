import React from "react";
import arrowRightPurple from "../assets/arrow-right.png";

const ButtonNext = ({
  actionPrev,
  actionNext,
  readyNext,
  loadingNext,
}: {
  actionPrev?: () => void;
  actionNext: () => void;
  readyNext?: boolean;
  loadingNext?: boolean;
}) => {
  return (
    <div className="fixed bottom-5 w-full px-4 flex flex-row">
      <div className="flex-4 p-2">
        {actionPrev && (
          <button
            onClick={actionPrev}
            className="text-white text-base font-semibold"
          >
            Kembali
          </button>
        )}
      </div>
      <div className="flex-5">
        <button
          onClick={() => (readyNext ? actionNext?.() : console.log("not ready"))}
          className={`flex items-center justify-end px-3 py-2 rounded-lg ${readyNext ? "bg-purple-400" : "bg-gray-400"
            }`}
        >
          {loadingNext ? (
            <div className="spinner" />
          ) : (
            <>
              <span className="text-black font-semibold text-base">Selanjutnya</span>
              <img
                src={arrowRightPurple}
                className="h-3 w-4 ml-2"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ButtonNext