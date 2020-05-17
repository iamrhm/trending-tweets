import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WelcomeBox = styled.li`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputBox = styled.input`
  width: 80%;
  height: 100%;
  padding: 2% 0.5%;
  display: flex;
  text-align: left;
  :focus {
    outline: none;
  }
`;

export const Btn = styled.button`
  width: 10%;
  height: 34px;
  padding: 2% 0.5%;
  margin: 2% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;
