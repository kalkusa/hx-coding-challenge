import { ComponentProps, forwardRef } from "react";

import styled from "styled-components";

export const Cell = styled(
  forwardRef<
    HTMLDivElement,
    ComponentProps<"div"> & { backgroundColor: string }
  >(({ backgroundColor, ...props }, ref) => <div ref={ref} {...props} />)
)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: black;
`;
