import styled from "styled-components";

interface FilterButtonProps {
  $active?: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${(props) => (props.$active ? "#61dafb" : "")};
`;
