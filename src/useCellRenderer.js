import React from 'react';
import {
  calcColumnWidth,
  getDeterministicColumnWidth,
  percentToFixedWidth,
} from './utils';
import { TableCell } from '@material-ui/core';

export const useCellRenderer = ({
  recomputeGridSize,
  columns,
  width,
  data,
  isCellHovered,
  onHeaderClick,
  onCellClick,
}) => {
  const [{ hoveredColumn, hoveredRowData }, setHovered] = React.useState({
    hoveredColumn: null,
    hoveredRowData: null,
  });

  React.useEffect(() => {
    recomputeGridSize();
  }, [recomputeGridSize, hoveredColumn, hoveredRowData]);

  const getColumnWidth = React.useCallback(
    ({ index }) => calcColumnWidth(index, columns, width),
    [columns, width],
  );

  const handleMouse = React.useCallback(
    (hoveredColumn, hoveredRowData) => (e) => {
      console.log(hoveredColumn, hoveredRowData);
      setHovered({
        hoveredColumn,
        hoveredRowData,
      });
    },
    [setHovered],
  );

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const column = columns[columnIndex];
    const isHeader = rowIndex === 0;
    const headerOffset = 1;
    const rowData = (data && data[rowIndex - headerOffset]) || {};

    const isHovered =
      hoveredColumn &&
      hoveredRowData &&
      isCellHovered &&
      isCellHovered(column, rowData, hoveredColumn, hoveredRowData);

    console.log(isHovered);

    // const resolveCellProps = (cellProps) =>
    //   typeof cellProps === 'function'
    //     ? cellProps(column, rowData, hoveredColumn, hoveredRowData)
    //     : cellProps;
    // TODO: Deep merge (do not override all defaultCellProps styles if column.cellProps.styles defined?)
    // const { style: cellStyle, ...cellProps } = {
    //   ...resolveCellProps(defaultCellProps),
    //   ...resolveCellProps(column.cellProps),
    // };

    const contents = (
      <div>
        <span style={{ flex: 'auto' }}>
          {isHeader
            ? column.header != null
              ? column.header
              : column.name
            : column.cell
            ? column.cell(rowData)
            : rowData[column.name]}
          {isHovered ? 'Hover' : ''}
        </span>
      </div>
    );

    const hasCellClick = !isHeader && onCellClick;
    const isClickable = hasCellClick || column.onClick;

    // const className = classNames(classes.cell, {
    //   [classes.cellClickable]: isClickable,
    //   [classes.cellHovered]: isHovered,
    //   [classes.cellSelected]: isSelected,
    //   [classes.cellDisabled]: isDisabled,
    //   [classes.cellHeader]: isHeader,
    //   [classes.cellInLastColumn]: columnIndex === columns.length - 1,
    //   [classes.cellInLastRow]:
    //     !isHeader && rowIndex === (data ? data.length : 0),
    // });

    return (
      <TableCell
        component="div"
        // className={className}
        key={key}
        onMouseEnter={handleMouse(column, rowData)}
        onMouseLeave={handleMouse(null, null)}
        style={{
          ...style,
          //   ...cellStyle,
        }}
        {...(hasCellClick && {
          onClick: (event) => onCellClick(event, { column, rowData, data }),
        })} // Can be overridden by cellProps.onClick on column definition
        // {...cellProps}
        padding="none"
      >
        {isHeader ? contents : contents}
      </TableCell>
    );
  };

  return { cellRenderer, columnWidth: getColumnWidth };
};
