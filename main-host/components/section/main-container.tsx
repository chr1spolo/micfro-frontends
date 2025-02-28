/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { lazy, useState } from "react";

import { Button as StyledButton, Container } from "@/styleds/global";
import ToggleLanguage from "@/components/toggle-language";
import { useTranslations } from "next-intl";

//@ts-ignore
const CharacterListRick = lazy(() => import("rick-and-morty/CharacterList"));
//@ts-ignore
const CharacterListHarry = lazy(() => import("harry-potter/CharacterList"));

const MainContainer = () => {
  const t = useTranslations("Home");
  const [showMF, setShowMF] = useState<
    null | "rick-and-morty" | "harry-potter"
  >(null);
  const titleComplete = `${t("title")} ${
    showMF === "rick-and-morty"
      ? t("btn_rick_and_morty")
      : t("btn_harry_potter")
  }`;
  return (
    <Container>
      <ToggleLanguage />
      <div>
        <StyledButton onClick={() => setShowMF("harry-potter")}>
          {t("btn_harry_potter")}
        </StyledButton>
        <StyledButton onClick={() => setShowMF("rick-and-morty")}>
          {t("btn_rick_and_morty")}
        </StyledButton>
      </div>
      {showMF === "rick-and-morty" && (
        <CharacterListRick title={titleComplete} />
      )}
      {showMF === "harry-potter" && (
        <CharacterListHarry title={titleComplete} />
      )}
    </Container>
  );
};

export default MainContainer;
