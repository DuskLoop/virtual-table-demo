export const calcColumnWidth = (index, columns, tableWidth) => {
  const column = columns[index];

  const totalAllocatedWidth = columns.reduce(
    (result, c) => result + c.minWidth,
    0,
  );

  const width = Math.max(
    column.minWidth,
    column.minWidth + column.width * (tableWidth - totalAllocatedWidth),
  );

  return width;
};

export const getDeterministicColumnWidth = (column, tableWidth) => {
  const percentageBasedWidth = percentToFixedWidth(column.width, tableWidth);
  return Math.max(percentageBasedWidth, column.minWidth || 0);
};

export const percentToFixedWidth = (percentAsString, tableWidth) => {
  return (parseFloat(percentAsString) / 100) * tableWidth;
};
