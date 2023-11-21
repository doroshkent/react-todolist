import styled from "styled-components";

type InputProps = {
  $error: string | null;
};

export const Input = styled.input<InputProps>`
  border: ${(props) =>
    props.$error ? "2px solid #d92e2e" : "1px solid #0a0a0a"};
`;
