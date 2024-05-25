import { ChangeEventHandler } from "react";

import styled from "styled-components";

import { TextField } from "../TextField";

const ParametersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 8px;
`;

interface VirtualizerParametersProps {
  numRowsInput: string;
  onChangeNumRows: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  numColsInput: string;
  onChangeNumCols: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  rowHeightInput: string;
  onChangeRowHeight: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  columnWidthInput: string;
  onChangeColumnWidth: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  containerHeightInput: string;
  onChangeContainerHeight: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  containerWidthInput: string;
  onChangeContainerWidth: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export const VirtualizerParameters = ({
  numRowsInput,
  onChangeNumRows,
  numColsInput,
  onChangeNumCols,
  rowHeightInput,
  onChangeRowHeight,
  columnWidthInput,
  onChangeColumnWidth,
  containerHeightInput,
  onChangeContainerHeight,
  containerWidthInput,
  onChangeContainerWidth,
}: VirtualizerParametersProps) => {
  return (
    <ParametersContainer>
      <TextField
        label="Num Rows"
        value={numRowsInput}
        onChange={onChangeNumRows}
      />
      <TextField
        label="Num Columns"
        value={numColsInput}
        onChange={onChangeNumCols}
      />
      <TextField
        label="Row Height"
        value={rowHeightInput}
        onChange={onChangeRowHeight}
      />
      <TextField
        label="Column Width"
        value={columnWidthInput}
        onChange={onChangeColumnWidth}
      />
      <TextField
        label="Container Height"
        value={containerHeightInput}
        onChange={onChangeContainerHeight}
      />
      <TextField
        label="Container Width"
        value={containerWidthInput}
        onChange={onChangeContainerWidth}
      />
    </ParametersContainer>
  );
};
