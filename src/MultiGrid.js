import React, { useRef } from 'react';
import { MultiGrid as VirtMultiGrid, AutoSizer } from 'react-virtualized';
import { data, columns } from './data';
import { makeStyles, TableCell, Typography, Table } from '@material-ui/core';
import { useCellRenderer } from './useCellRenderer';

const useStyles = makeStyles(() => ({
  container: {
    // margin: '100px',
    backgroundColor: 'Aquamarine',
    width: '100%',
    height: '400px',
  },
}));

const MultiGridTable = (props) => {
  const classes = useStyles();
  const cellRendererResult = useCellRenderer({
    recomputeGridSize: props.recomputeGridSize,
    columns,
    width: props.width,
    data,
    isCellHovered: (column, rowData, hoveredColumn, hoveredRowData) => {
      return rowData.id && rowData.id === hoveredRowData.id;
    },
    onHeaderClick: () => {},
    onCellClick: () => {},
  });

  return (
    <Table component="div">
      <VirtMultiGrid
        {...cellRendererResult}
        columnCount={columns.length}
        fixedRowCount={1}
        height={400}
        rowHeight={50}
        rowCount={4}
        width={props.width}
        estimatedColumnSize={20}
        ref={props.multiGrid}
      />
    </Table>
  );
};

export const MultiGrid = (props) => {
  const classes = useStyles();
  const multiGrid = useRef(null);

  const recomputeGridSize = React.useCallback(
    () => multiGrid.current && multiGrid.current.recomputeGridSize(),
    [multiGrid],
  );

  const handleResize = () => {
    if (multiGrid.current) {
      multiGrid.current.recomputeGridSize();
    }
  };

  return (
    <div className={classes.container}>
      <AutoSizer onResize={handleResize}>
        {({ height, width }) => (
          <MultiGridTable
            {...props}
            width={width}
            multiGrid={multiGrid}
            height={height}
            recomputeGridSize={recomputeGridSize}
          />
        )}
      </AutoSizer>
    </div>
  );
};
