import styled from "styled-components";

import { Virtualizer } from "./component-library";
import { Cell } from "./component-library/Cell";
import { VirtualizerParameters } from "./component-library/VirtualizerParameters";
import { useNumberParameter } from "./hooks/useNumbersParameter";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [numRowsInput, numRows, onChangeNumRows] = useNumberParameter(5);
  const [numColsInput, numCols, onChangeNumCols] = useNumberParameter(5);
  const [rowHeightInput, rowHeight, onChangeRowHeight] = useNumberParameter(50);
  const [columnWidthInput, columnWidth, onChangeColumnWidth] =
    useNumberParameter(100);
  const [containerHeightInput, containerHeight, onChangeContainerHeight] =
    useNumberParameter(400);
  const [containerWidthInput, containerWidth, onChangeContainerWidth] =
    useNumberParameter(400);

  return (
    <Container>
      <h1>A Simple Virtualizer</h1>
      <VirtualizerParameters
        numRowsInput={numRowsInput}
        onChangeNumRows={onChangeNumRows}
        numColsInput={numColsInput}
        onChangeNumCols={onChangeNumCols}
        rowHeightInput={rowHeightInput}
        onChangeRowHeight={onChangeRowHeight}
        columnWidthInput={columnWidthInput}
        onChangeColumnWidth={onChangeColumnWidth}
        containerHeightInput={containerHeightInput}
        onChangeContainerHeight={onChangeContainerHeight}
        containerWidthInput={containerWidthInput}
        onChangeContainerWidth={onChangeContainerWidth}
      />
      <Virtualizer
        numRows={numRows}
        numColumns={numCols}
        rowHeight={rowHeight}
        columnWidth={columnWidth}
        containerHeight={containerHeight}
        containerWidth={containerWidth}
      >
        {({ rowIndex, columnIndex, style }) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            style={style}
            backgroundColor={
              (rowIndex + (columnIndex % 2)) % 2 === 0 ? "lightgray" : "white"
            }
          >
            <p>
              {rowIndex}:{columnIndex}
            </p>
          </Cell>
        )}
      </Virtualizer>
    </Container>
  );
};

export default App;
