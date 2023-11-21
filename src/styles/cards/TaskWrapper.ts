import styled from "styled-components";

interface TaskWrapperProps {
  $isDone: boolean;
}

export const TaskWrapper = styled.li<TaskWrapperProps>`
  list-style: none;
  opacity: ${(props) => (props.$isDone ? "0.5" : "1")};
`;
