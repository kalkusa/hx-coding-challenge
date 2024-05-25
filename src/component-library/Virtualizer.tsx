/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const BUFFER = 10;
  const totalHeight = numRows * rowHeight;
  const totalWidth = numColumns * columnWidth;

  const containerRef = useRef<HTMLDivElement>(null);

  const [firstVisibleRow, setFirstVisibleRow] = useState(0);
  const [lastVisibleRow, setLastVisibleRow] = useState(
    Math.min(numRows - 1, Math.ceil(containerHeight / rowHeight) + BUFFER - 1)
  );
  const [firstVisibleColumn, setFirstVisibleColumn] = useState(0);
  const [lastVisibleColumn, setLastVisibleColumn] = useState(
    Math.min(
      numColumns - 1,
      Math.ceil(containerWidth / columnWidth) + BUFFER - 1
    )
  );

  const calculateVisibleItems = (
    scrollTop: number,
    scrollLeft: number,
    containerHeight: number,
    containerWidth: number,
    rowHeight: number,
    columnWidth: number,
    numRows: number,
    numColumns: number
  ) => {
    const firstVisibleRow = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - BUFFER
    );
    const firstVisibleColumn = Math.max(
      0,
      Math.floor(scrollLeft / columnWidth) - BUFFER
    );
    const lastVisibleRow = Math.min(
      numRows - 1,
      firstVisibleRow + Math.ceil(containerHeight / rowHeight) + 2 * BUFFER - 1
    );
    const lastVisibleColumn = Math.min(
      numColumns - 1,
      firstVisibleColumn +
        Math.ceil(containerWidth / columnWidth) +
        2 * BUFFER -
        1
    );

    return {
      firstVisibleRow,
      lastVisibleRow,
      firstVisibleColumn,
      lastVisibleColumn,
    };
  };

  const updateVisibleItems = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const { scrollTop, scrollLeft } = containerRef.current;

    const {
      firstVisibleRow,
      lastVisibleRow,
      firstVisibleColumn,
      lastVisibleColumn,
    } = calculateVisibleItems(
      scrollTop,
      scrollLeft,
      containerHeight,
      containerWidth,
      rowHeight,
      columnWidth,
      numRows,
      numColumns
    );

    setFirstVisibleRow(firstVisibleRow);
    setLastVisibleRow(lastVisibleRow);
    setFirstVisibleColumn(firstVisibleColumn);
    setLastVisibleColumn(lastVisibleColumn);
  }, [
    containerHeight,
    containerWidth,
    rowHeight,
    columnWidth,
    numRows,
    numColumns,
  ]);

  useEffect(() => {
    updateVisibleItems();
  }, [updateVisibleItems]);

  const onScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { scrollTop, scrollLeft } = currentTarget;

      const {
        firstVisibleRow,
        lastVisibleRow,
        firstVisibleColumn,
        lastVisibleColumn,
      } = calculateVisibleItems(
        scrollTop,
        scrollLeft,
        containerHeight,
        containerWidth,
        rowHeight,
        columnWidth,
        numRows,
        numColumns
      );

      setFirstVisibleRow(firstVisibleRow);
      setLastVisibleRow(lastVisibleRow);
      setFirstVisibleColumn(firstVisibleColumn);
      setLastVisibleColumn(lastVisibleColumn);
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
      ref={containerRef}
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
