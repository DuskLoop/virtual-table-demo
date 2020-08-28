import React from 'react';
import { AutoSizer, Table as VirtTable, Column } from 'react-virtualized';
import { data } from './data';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    margin: '100px',
    backgroundColor: 'Aquamarine',
    overflow: 'auto',
    width: '80%',
    height: '400px',
  },
}));

const rowGetter = ({ index }) => {
  return data[index];
};

export const Table = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ height, width }) => {
          console.log(width);
          return (
            <VirtTable
              headerHeight={50}
              height={height}
              rowCount={4}
              rowGetter={rowGetter}
              rowHeight={20}
              width={width}
              rowStyle={{ width: width, overflow: 'visible' }}
              style={{ overflow: 'visible' }}
              gridStyle={{ overflow: 'visible' }}
            >
              <Column
                label="Index"
                dataKey="index"
                width={500}
                minWidth={300}
              />
              <Column label="col1" dataKey="col1" width={500} minWidth={300} />
              <Column label="col2" dataKey="col2" width={500} minWidth={300} />
            </VirtTable>
          );
        }}
      </AutoSizer>
    </div>
  );
};
