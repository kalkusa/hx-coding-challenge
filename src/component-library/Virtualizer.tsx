import React, { useCallback, useEffect, useState } from "react";

interface VirtualizerProps {
  numRows: number;
  numColumns: number;
  rowHeight: number;
  columnWidth: number;
  containerHeight: number;
  containerWidth: number;
  children: (info: {
    rowIndex: number;
    columnIndex: number;
    style: React.CSSProperties;
  }) => JSX.Element | null;
}

const VirtualizerComponent = ({
  numRows,
  numColumns,
  rowHeight,
  columnWidth,
  containerHeight,
  containerWidth,
  children,
}: VirtualizerProps) => {
  console.log("Render")
  const totalHeight = numRows * rowHeight;
  const totalWidth = numColumns * columnWidth;

  const [firstVisibleRow, setFirstVisibleRow] = useState(0);
  const [lastVisibleRow, setLastVisibleRow] = useState(0);
  const [firstVisibleColumn, setFirstVisibleColumn] = useState(0);
  const [lastVisibleColumn, setLastVisibleColumn] = useState(0);

  const updateVisibleItems = useCallback(() => {
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const visibleColumns = Math.ceil(containerWidth / columnWidth);

    setLastVisibleRow(Math.min(numRows - 1, firstVisibleRow + visibleRows - 1));
    setLastVisibleColumn(
      Math.min(numColumns - 1, firstVisibleColumn + visibleColumns - 1)
    );
  }, [
    containerHeight,
    containerWidth,
    rowHeight,
    columnWidth,
    numRows,
    numColumns,
    firstVisibleRow,
    firstVisibleColumn,
  ]);

  useEffect(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  const onScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { scrollTop, scrollLeft } = currentTarget;
      const newFirstVisibleRow = Math.floor(scrollTop / rowHeight);
      const newFirstVisibleColumn = Math.floor(scrollLeft / columnWidth);

      setFirstVisibleRow(newFirstVisibleRow);
      setLastVisibleRow(
        Math.min(
          numRows - 1,
          newFirstVisibleRow + Math.ceil(containerHeight / rowHeight) - 1
        )
      );
      setFirstVisibleColumn(newFirstVisibleColumn);
      setLastVisibleColumn(
        Math.min(
          numColumns - 1,
          newFirstVisibleColumn + Math.ceil(containerWidth / columnWidth) - 1
        )
      );
    },
    [
      containerHeight,
      containerWidth,
      rowHeight,
      columnWidth,
      numRows,
      numColumns,
    ]
  );

  return (
    <div
      style={{
        height: containerHeight,
        width: containerWidth,
        overflow: "auto",
      }}
      onScroll={onScroll}
    >
      <div
        style={{
          position: "relative",
          height: totalHeight,
          width: totalWidth,
          overflow: "hidden",
        }}
      >
        {new Array(lastVisibleRow + 1 - firstVisibleRow)
          .fill(null)
          .map((_, y) =>
            new Array(lastVisibleColumn + 1 - firstVisibleColumn)
              .fill(null)
              .map((__, x) => {
                const rowIndex = firstVisibleRow + y;
                const columnIndex = firstVisibleColumn + x;
                const style: React.CSSProperties = {
                  position: "absolute",
                  top: rowIndex * rowHeight,
                  left: columnIndex * columnWidth,
                  height: rowHeight,
                  width: columnWidth,
                };

                return children({ rowIndex, columnIndex, style });
              })
          )}
      </div>
    </div>
  );
};

export const Virtualizer = React.memo(VirtualizerComponent);
