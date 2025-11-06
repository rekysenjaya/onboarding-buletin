import React from "react";
import { motion } from "framer-motion";

import cancel from "../assets/cancel.png"
import check from "../assets/check.png"

const ModalAlertOnboarding = ({
  modalTextDesc,
  modalTextType,
  actionModal,
}: {
  modalTextDesc: string;
  modalTextType: "error" | "success";
  actionModal: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl min-h-[210px] w-72 text-center p-5"
      >
        <img
          src={modalTextType === "error" ? cancel : check}
          className="w-15 h-15 mx-auto"
        />
        <p className="text-sm text-gray-400 my-4">{modalTextDesc}</p>
        <button title="OK" onClick={actionModal} />
      </motion.div>
    </div>
  );
};

export default ModalAlertOnboarding
