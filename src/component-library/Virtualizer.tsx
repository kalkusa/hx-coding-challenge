import React, { useCallback, useState } from "react";

const checkNumberProp = (prop: any, fallback: number): number => {
  if (typeof prop === "number") {
    return prop;
  } else {
    return fallback;
  }
};

const checkNumberOrFunctionProp = (prop: any, fallback: number): number => {
  if (typeof prop === "number") {
    return prop;
  } else {
    return fallback;
  }
};

const checkFunctionProp = (
  prop: any,
  fallback: () => null
): ((info: {
  rowIndex: number;
  columnIndex: number;
  style: React.CSSProperties;
}) => JSX.Element | null) => {
  if (typeof prop === "function") {
    return prop;
  } else {
    return fallback;
  }
};

export const Virtualizer = React.memo<{
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
}>(props => {
  const numRows = checkNumberProp(props.numRows, 0);
  const numColumns = checkNumberProp(props.numColumns, 0);
  const rowHeight = checkNumberOrFunctionProp(props.rowHeight, 0);
  const columnWidth = checkNumberOrFunctionProp(props.columnWidth, 0);
  const containerHeight = checkNumberProp(props.containerHeight, 0);
  const containerWidth = checkNumberProp(props.containerWidth, 0);
  const children = checkFunctionProp(props.children, () => null);

  const totalHeight = numRows * rowHeight;
  const totalWidth = numColumns * columnWidth;

  const [firstVisibleRow, setFirstVisibleRow] = useState(0);
  const [lastVisibleRow, setLastVisibleRow] = useState(0);
  const [firstVisibleColumn, setFirstVisibleColumn] = useState(0);
  const [lastVisibleColumn, setLastVisibleColumn] = useState(0);

  const onScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    ({ currentTarget }) => {
      const { scrollTop, scrollLeft } = currentTarget;
      setFirstVisibleRow(Math.floor(scrollTop / rowHeight));
      setLastVisibleRow(Math.floor((scrollTop + containerHeight) / rowHeight));
      setFirstVisibleColumn(Math.floor(scrollLeft / columnWidth));
      setLastVisibleColumn(
        Math.floor((scrollLeft + containerWidth) / columnWidth)
      );
    },
    []
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
                  position: "fixed",
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
});
