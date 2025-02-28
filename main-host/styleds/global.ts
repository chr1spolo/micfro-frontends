import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

export const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
