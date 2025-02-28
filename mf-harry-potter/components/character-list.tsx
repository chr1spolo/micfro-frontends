"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Character {
  id: number;
  name: string;
  image: string;
  alive: boolean;
  species: string;
  wizard: string;
  gender: string;
  alternate_names: string[];
  actor: string;
}

const CharacterList = ({
  title = "Character List Harry Potter",
}: {
  title?: string;
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(0);
  const [charactersView, setCharactersView] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters("https://hp-api.onrender.com/api/characters");
  }, []);

  const fetchCharacters = async (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setCharactersView(data.slice(0, 10));
        setPage(1);
        document.getElementById("character-list")?.scrollTo(0, 0);
      })
      .catch((err) => console.error("Error fetching characters:", err));
  };

  const paginateCharacters = (page: number) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setCharactersView(characters.slice(start, end));
    setPage(page);
    document.getElementById("character-list")?.scrollTo(0, 0);
  }

  return (
    <Section id="character-list">
      <Container>
        <Title>{title}</Title>
        <CharacterItemContainer>
          {charactersView.length > 0 &&
            charactersView.map((character) => (
              <CharacterContainer key={character.id}>
                {character.image !== "" && (
                  <ImageDiv>
                    <ImageCharacter
                      src={character.image}
                      alt={character.name}
                      width={100}
                      height={100}
                    />
                  </ImageDiv>
                )}
                <CharacterDetails>
                  <CharacterDetailSection>
                    <CharacterSpanName>{character.name}</CharacterSpanName>
                    <CharacterSpan>
                      <CharacterStatus $isAlived={character.alive} />
                      {character.alive ? "Alive" : "Not Alive"} -{" "}
                      {character.species}
                    </CharacterSpan>
                  </CharacterDetailSection>
                  <CharacterDetailSection>
                    <CharacterSpan>Alternate Names:</CharacterSpan>
                    <CharacterSpan
                      dangerouslySetInnerHTML={{
                        __html: character.alternate_names.join(" <br/> "),
                      }}
                    />
                  </CharacterDetailSection>
                  <CharacterDetailSection>
                    <CharacterSpan>Actor:</CharacterSpan>
                    <CharacterSpan>{character.actor}</CharacterSpan>
                  </CharacterDetailSection>
                </CharacterDetails>
              </CharacterContainer>
            ))}
        </CharacterItemContainer>
      </Container>
      <ActionSection>
        {page > 1 && (
          <ActionButton onClick={() => paginateCharacters(1)}>
            First page
          </ActionButton>
        )}
        {page > 1 && (
          <ActionButton onClick={() => paginateCharacters(page - 1)}>
            Previous
          </ActionButton>
        )}
        {characters.length > page * 10 && (
          <ActionButton onClick={() => paginateCharacters(page + 1)}>
            Next
          </ActionButton>
        )}
        {characters.length > page * 10 && (
          <ActionButton onClick={() => paginateCharacters(Math.ceil(characters.length / 10))}>
            Last page
          </ActionButton>
        )}
      </ActionSection>
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
  object-fit: contain;
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

const CharacterStatus = styled.span<{ $isAlived?: boolean }>`
  display: flex;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: ${({ $isAlived }) =>
    $isAlived ? "rgb(85, 204, 68)" : "rgb(214, 61, 46)"};
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