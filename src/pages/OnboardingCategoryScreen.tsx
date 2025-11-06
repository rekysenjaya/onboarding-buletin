import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ButtonNext from "../components/ButtonNext";
import { ScreenComponentProps } from "../type/onboardingType";
import categoryList from "../json/category.json"; // array of strings

const OnboardingCategoryScreen: React.FC<ScreenComponentProps> = ({
  onNext,
  onPrev,
  data,
  setField,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill jika ada data.favorite_category
  useEffect(() => {
    if (data?.favorite_category && Array.isArray(data.favorite_category)) {
      setSelectedCategories(data.favorite_category);
    }
  }, [data]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const submit = async () => {
    if (!selectedCategories.length) {
      setError("Mohon pilih kategori yang Anda sukai");
      return;
    }

    setLoading(true);
    try {
      setField("favorite_category", selectedCategories);
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
        Kamu menulis cerita dengan kategori apa?
      </motion.h1>

      <motion.p
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
        className="text-white text-xs mb-4"
      >
        MinDi akan bantu kamu menemukan pembaca yang tepat untuk karyamu!
      </motion.p>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
        className="flex flex-wrap -mr-2"
      >
        {categoryList.map((category) => (
          <motion.div
            key={category}
            whileTap={{ scale: 0.95 }}
            className="mr-2 mb-3 cursor-pointer"
            onClick={() => toggleCategory(category)}
          >
            <div
              className={`px-4 h-8 rounded-full flex items-center transition-colors duration-200 ${
                selectedCategories.includes(category)
                  ? "bg-[#FCD942]"
                  : "bg-white"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  selectedCategories.includes(category) ? "text-white" : "text-black"
                }`}
              >
                {category}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {error && (
        <div className="text-red-500 mt-2 text-sm animate-pulse">{error}</div>
      )}

      <div className="mt-8">
        <ButtonNext
          readyNext={!!selectedCategories.length}
          loadingNext={loading}
          actionNext={submit}
          actionPrev={onPrev}
        />
      </div>
    </div>
  );
};

export default OnboardingCategoryScreen;
