import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

import ButtonNext from "../components/ButtonNext";

import { ScreenComponentProps } from "../type/onboardingType";

import bellBold from "../assets/bell-bold.png"

const OnboardingNotifScreen: React.FC<ScreenComponentProps> = ({ onNext, onPrev }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const _goToSetting = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  const updateOnboarding = async () => {
    setLoading(true);
    try {
      onNext()
    } catch {
      setLoading(false);
    }
  };

  const submit = () => {
    const permissionGranted = Notification.permission === "granted";

    if (permissionGranted) {
      updateOnboarding();
    } else {
      setModalVisible(true);
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-white text-2xl font-bold mb-4"
      >
        Jangan sampai <br />
        ketinggalan informasi terbaru dari GoodBuletin!
      </motion.h1>

      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
        className="text-white text-sm font-normal mb-4"
      >
        Dapatkan notifikasi tentang fitur penulis, promo menarik, serta event khusus untuk kreator.
      </motion.p>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, type: "spring" }}
        className="flex items-center mb-4"
      >
        <img src={bellBold} alt="bell" className="w-8 h-8 mr-2" />
        <div>
          <p className="text-white font-bold text-sm m-0">Notifikasi</p>
          <p className="text-white text-xs m-0">
            GoodBuletin akan mengirimkan pemberitahuan penting seputar karya kamu, event menulis, dan kesempatan kolaborasi.
          </p>
        </div>
      </motion.div>

      <div className="mt-8">
        <ButtonNext
          readyNext={true}
          loadingNext={loading}
          actionNext={submit}
          actionPrev={onPrev}
        />
      </div>

      {/* Modal */}
      {modalVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-72 p-6 text-center">
            <p className="font-bold text-sm text-gray-800 mb-2">
              “GoodBuletin” ingin mengirimkan notifikasi kepada kamu.
            </p>
            <p className="text-xs text-black mb-4">
              GoodBuletin akan mengirimkan pemberitahuan penting seputar karya kamu, event menulis, dan kesempatan kolaborasi.
            </p>
            <div className="flex justify-between gap-2">
              <button
                style={{ flex: 1 }}
                title="Batal"
                onClick={() => {
                  setModalVisible(false);
                  updateOnboarding();
                }}
              >
                Batal
              </button>
              <button
                style={{ flex: 1 }}
                onClick={() => {
                  setModalVisible(false);
                  _goToSetting("https://example.com/settings-notifications");
                  updateOnboarding();
                }}
              >
                Izinkan
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnboardingNotifScreen;
