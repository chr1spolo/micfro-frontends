"use client";
import React, { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";

const ToggleLanguage = () => {
  const locale = useLocale();
  const [lang, setLang] = useState(locale);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    setLang(locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div>
      <select onChange={handleChange} value={lang}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default ToggleLanguage;
