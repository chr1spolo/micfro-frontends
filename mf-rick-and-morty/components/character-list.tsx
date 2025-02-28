"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

const CharacterList = ({
  title = "Character List Rick and morty",
}: {
  title?: string;
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters("https://rickandmortyapi.com/api/character");
  }, []);

  const fetchCharacters = async (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setNextPage(data.info.next ?? null);
        setPrevPage(data.info.prev ?? null);
        document.getElementById("character-list")?.scrollTo(0, 0);
      })
      .catch((err) => console.error("Error fetching characters:", err));
  };

  return (
    <Section id="character-list">
      <Container>
        <Title>{title}</Title>
        <CharacterItemContainer>
          {characters.map((character) => (
            <CharacterContainer key={character.id}>
              <ImageDiv>
                <ImageCharacter
                  src={character.image}
                  alt={character.name}
                  width={100}
                  height={100}
                />
              </ImageDiv>
              <CharacterDetails>
                <CharacterDetailSection>
                  <CharacterSpanName>{character.name}</CharacterSpanName>
                  <CharacterSpan>
                    <CharacterStatus $isAlived={character.status} />
                    {character.status} - {character.species}
                  </CharacterSpan>
                </CharacterDetailSection>
                <CharacterDetailSection>
                  <CharacterSpan>Last know location:</CharacterSpan>
                  <CharacterSpan>{character.location.name}</CharacterSpan>
                </CharacterDetailSection>
              </CharacterDetails>
            </CharacterContainer>
          ))}
        </CharacterItemContainer>
        <ActionSection>
          {prevPage && (
            <ActionButton onClick={() => fetchCharacters(prevPage)}>
              Previous
            </ActionButton>
          )}
          {nextPage && (
            <ActionButton onClick={() => fetchCharacters(nextPage)}>
              Next
            </ActionButton>
          )}
        </ActionSection>
      </Container>
    </Section>
  );
};

export default CharacterList;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100vh;
  scroll-behavior: smooth;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1920px;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #c0c0c0;
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;

const CharacterItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
`;

const CharacterContainer = styled.div`
  display: flex;
  width: 600px;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0.75rem;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const ImageDiv = styled.div`
  flex: 2 1 0%;
  width: 100%;
`;

const ImageCharacter = styled.img`
  width: 100%;
  height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s;
  object-position: center center;
  object-fit: cover;
`;

const CharacterDetails = styled.div`
  flex: 3 1 0%;
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  &:first-child {
    -webkit-box-pack: start;
    justify-content: flex-start;
  }
`;

const CharacterDetailSection = styled.div`
  -webkit-box-pack: start;
  justify-content: flex-start;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const CharacterSpan = styled.span`
  color: rgb(245, 245, 245);
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: capitalize;
`;

const CharacterSpanName = styled(CharacterSpan)`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CharacterStatus = styled.span<{ $isAlived?: string }>`
  display: flex;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: ${({ $isAlived }) =>
    $isAlived === "Alive" ? "rgb(85, 204, 68)" : "rgb(214, 61, 46)"};
  border-radius: 50%;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #c0c0c0;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #c0c0c0;
  }
`;
