import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ButtonNext from "../components/ButtonNext";
import listGenre from "../json/genre.json";

import { ScreenComponentProps } from "../type/onboardingType";

const OnboardingGenresScreen: React.FC<ScreenComponentProps> = ({
  onNext,
  onPrev,
  data,
  setField,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill jika ada data.favorite_tag
  useEffect(() => {
    if (data?.favorite_tag && Array.isArray(data.favorite_tag)) {
      setSelectedGenres(data.favorite_tag);
    }
  }, [data]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const submit = async () => {
    if (!selectedGenres.length) {
      setError("Mohon pilih genre yang Anda sukai");
      return;
    }

    setLoading(true);
    try {
      setField("favorite_tag", selectedGenres);
      onNext();
      setLoading(false);
    } catch {
      setError("Terjadi kesalahan, coba lagi");
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-white text-2xl font-bold mb-4"
      >
        Kamu suka nulis tentang apa?
      </motion.h1>

      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        className="text-white text-sm mb-4"
      >
        MinDi bakal bantu kenalin karya kamu ke pembaca yang suka topik itu juga!
      </motion.p>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
        className="flex flex-wrap -mr-2"
      >
        {listGenre.map((genre) => (
          <motion.div
            key={genre}
            whileTap={{ scale: 0.95 }}
            className="mr-2 mb-3 cursor-pointer"
            onClick={() => toggleGenre(genre)}
          >
            <div
              className={`px-4 h-8 flex items-center rounded-full transition-colors duration-200 font-semibold text-xs ${
                selectedGenres.includes(genre)
                  ? "bg-[#FCD942] text-white"
                  : "bg-white text-black"
              }`}
            >
              {genre}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {error && (
        <div className="text-red-500 mt-2 text-sm animate-pulse">{error}</div>
      )}

      <div className="mt-8">
        <ButtonNext
          readyNext={!!selectedGenres.length}
          loadingNext={loading}
          actionNext={submit}
          actionPrev={onPrev}
        />
      </div>
    </div>
  );
};

export default OnboardingGenresScreen;
