import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'description',
    headerName: 'Beschreibung',
    flex: 4,
    editable: true,
    description: 'This column has a value getter and is not sortable.',
    type: "string",
  },
  {
    field: 'lastUpdate',
    headerName: 'letztes Update',
    flex: 2,
    description: 'letzte Aktualisierung für alle.',
    type: "dateTime",
  },
  ...["A", "D", "F", "G", "J"].map(letter => ({
    field: letter,
    headerName: letter,
    flex: 1,
    type: "number",
    editable: true,
  }))
];

const rows = Array.from({ length: 99 }).map((_, index) => ({
  id: index,
  "A": 0,
  "D": 0,
  "F": 0,
  "G": 0,
  "J": 0,
}));



const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: 'Sammlung',
    children: [{ field: 'A', }, { field: 'D', }, { field: 'F', }, { field: 'G', }, { field: 'J', },],
  }
];

export default function DataGridDemo() {
  console.log(rows);
  return (
    <Box sx={{ height: '95vh', width: '95vw'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroupingModel}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
      pageSizeOptions={[5,10,15]}
      />
    </Box>
  );
}