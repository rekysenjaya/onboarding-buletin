import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ButtonNext from "../components/ButtonNext";

import { ScreenComponentProps } from "../type/onboardingType";

const listWhere = [
  { label: "Social Media (Facebook, Instagram, Youtube, TikTok, Linkedin, etc)", value: "Social Media (Facebook, Instagram, Youtube, TikTok, Linkedin, etc)" },
  { label: "Mesin Pencari (Google, Bing, DuckDuckGo, etc)", value: "Mesin Pencari (Google, Bing, DuckDuckGo, etc)" },
  { label: "Rekomendasi Teman", value: "Rekomendasi Teman" },
  { label: "Event Offline", value: "Event Offline" },
  { label: "Lainnya", value: "Lainnya" }
];

const OnboardingWhereInfoScreen: React.FC<ScreenComponentProps> = ({ onNext, onPrev, data, setField, resetOnboarding }) => {
  const [adSource, setAdSource] = useState("");
  const [elseSource, setElseSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data?.ad_source) {
      const found = listWhere.find(v => v.value === data.ad_source);
      if (found) {
        setAdSource(found.value);
      } else {
        setAdSource("Lainnya");
        setElseSource(data.ad_source);
      }
    }
  }, [data]);

  const submit = async () => {
    if (adSource === "Lainnya" && !elseSource.trim()) {
      alert("Mohon isi sumbernya");
      return;
    }

    setLoading(true);
    try {
      const valueToSave = adSource === "Lainnya" ? elseSource.trim() : adSource;
      setField("ad_source", valueToSave); // <-- simpan langsung ke data.ad_source
      setLoading(false);
      onNext();
    } catch (err) {
      console.error(err);
      setLoading(false);
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
        Dari mana kamu mengetahui platform penulis GoodBuletin?
      </motion.h1>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, type: "spring" }}
      >
        {listWhere.map((item) => (
          <div
            key={item.value}
            onClick={() => {
              setAdSource(item.value);
              if (item.value !== "Lainnya") setElseSource("");
            }}
            className={`bg-white rounded-md mt-4 p-2 flex items-center cursor-pointer ${item.value === "Lainnya" && adSource === "Lainnya" ? "rounded-t-md" : ""
              }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center mr-2">
              {adSource === item.value && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
            </div>
            <p className="text-gray-800 text-xs flex-1 m-0">{item.label}</p>
          </div>
        ))}
      </motion.div>

      {adSource === "Lainnya" && (
        <motion.input
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          type="text"
          placeholder="Isian untuk lainnya"
          value={elseSource}
          onChange={(e) => setElseSource(e.target.value)}
          className="mt-1 p-2 h-9 w-full bg-white border-none rounded-b-md text-black box-border"
        />
      )}

      <div className="mt-8">
        <ButtonNext
          actionPrev={onPrev}
          readyNext={(adSource !== "Lainnya" && !!adSource) || !!elseSource}
          loadingNext={loading}
          actionNext={() => setModalVisible(true)}
        />
      </div>
      {modalVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-72 p-6 text-center">
            <p className="font-bold text-sm text-gray-800 mb-2">
              Terima kasih! Data Anda sudah berhasil dikirim.
            </p>
            <p className="text-xs text-black mb-4">
              Apakah Anda ingin daftar baru?
            </p>
            <div className="flex justify-between gap-2">
              <button
                style={{ flex: 1 }}
                title="Batal"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Tidak
              </button>
              <button
                style={{ flex: 1 }}
                onClick={() => {
                  setModalVisible(false);
                  resetOnboarding()
                }}
              >
                Ya
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnboardingWhereInfoScreen;
