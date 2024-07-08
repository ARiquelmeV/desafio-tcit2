import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import './App.css';
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchSeguros } from './api/getSeguros';
import { Seguro } from './types/Seguro';
import { createSeguro } from './api/createSeguro';
import { deleteSeguro } from './api/deleteSeguro';

function App() {
  const [seguros, setSeguros] = useState<Seguro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [seguroName, setSeguroName] = useState<string>('');
  const [seguroDescription, setSeguroDescription] = useState<string>('');
  const [errorSeguroName, setSeguroNameError] = useState<string>('');
  const [errorSeguroDescription, setSeguroDescriptionError] = useState<string>('');

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { 
      field: 'nombre', 
      headerName: 'Nombre del seguro', 
      flex: 150,
      headerClassName: 'header-theme',
      headerAlign: 'center',
      align: 'center',
    },
    { 
      field: 'descripcion', 
      headerName: 'Descripción del seguro', 
      flex: 300,
      headerAlign: 'center',
      headerClassName: 'header-theme',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      sortable: false,
      flex: 100,
      headerClassName: 'header-theme',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Seguro>) => (
        <strong>
          <DeleteIcon onClick={() => handleEliminarClick(params.row as Seguro)} style={{ cursor: 'pointer' }} />
        </strong>
      ),
    },
  ];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const filterSeguros = (seguros: Seguro[]): Seguro[] => {
      return seguros.filter(
        (seguro) =>
          seguro.nombre
            ?.toLowerCase()
            .includes(query.toString().toLowerCase()) ||
            seguro.descripcion
            .toLowerCase()
            .includes(query.toString().toLowerCase())
      );
    };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSeguros();
        setSeguros(data);
      } catch (error) {
        console.error('Error fetching seguros:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSeguroNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setSeguroName(value);
    setSeguroNameError(
      value.length < 5
        ? 'El nombre del seguro debe tener al menos 5 caracteres.'
        : ''
    );
  };

  const handleSeguroDescriptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    setSeguroDescription(value);
    setSeguroDescriptionError(
      value.length < 5
        ? 'La descripción del seguro debe tener al menos 5 caracteres.'
        : ''
    );
  };

  const resetSeguroFields = () => {
    setSeguroName('');
    setSeguroDescription('');
  };

  const createNewSeguro = async () => {
    if (seguroName === '') {
      setSeguroNameError("Debe ingresar un nombre para el seguro.")
      return;
    }
    if (seguroDescription === '') {
      setSeguroDescriptionError("Debe ingresar una descripción para el seguro.")
      return;
    }
    if(errorSeguroName !== ''){
      return;
    }
    if(errorSeguroDescription !== ''){
      return;
    }
    const maxId = seguros.length > 0 ? Math.max(...seguros.map(seguro => seguro.id)) : 0;
    const nuevoSeguro: Seguro = {
      id: 0,
      nombre: seguroName,
      descripcion: seguroDescription
  };

    await createSeguro(nuevoSeguro);
    nuevoSeguro.id = maxId + 1
    setSeguros(prevSeguros => [...prevSeguros, nuevoSeguro]);
    resetSeguroFields();
  }

  const handleEliminarClick = async (seguroToDelete: Seguro) => {
    try {
      console.log(`Eliminar seguro ID ${seguroToDelete.id}: ${seguroToDelete.nombre}`);
      await deleteSeguro(seguroToDelete);
      setSeguros(prevSeguros => prevSeguros.filter(seguro => seguro.id !== seguroToDelete.id));
    } catch (error) {
      console.error(`Error al eliminar seguro ID ${seguroToDelete.id}:`, error);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          color="currentcolor"
          width="max-content"
          marginTop={4}
          marginBottom={4}
        >
          Lista de seguros
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            onChange={handleQueryChange}
            value={query}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box
          sx={{ 
            marginTop: 4,
           }}
        >
          <DataGrid
            rows={filterSeguros(seguros)}
            columns={columns}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'evenRow' : 'oddRow'
            }
            sx={{
              '& .evenRow': {
                backgroundColor: '#C9F6C9',
              },
              '& .oddRow': {
                backgroundColor: '#ffffff',
              },
              '& .header-theme': {
              backgroundColor: '#1E4F1E',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: 'white',
              },
              '& .MuiDataGrid-sortIcon': {
                opacity: 'inherit !important',
                color: 'white',
                fontWeight: 'bold',
                visibility: 'visible !important',
              },
            }}
          />
        </Box>
        <Stack
          marginTop={3}
          flexDirection="row"
          gap={3}
        >
          <TextField
            label="Nombre del seguro"
            value={seguroName}
            onChange={handleSeguroNameChange}
            error={Boolean(errorSeguroName)}
            size="small"
            helperText={errorSeguroName}
            sx={{
              borderBottomColor: errorSeguroName ? 'red' : undefined,
            }}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={seguroDescription}
            onChange={handleSeguroDescriptionChange}
            error={Boolean(errorSeguroDescription)}
            size="small"
            helperText={errorSeguroDescription}
            sx={{
              borderBottomColor: errorSeguroDescription ? 'red' : undefined,
            }}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={createNewSeguro}
            disabled={loading}
            style={{ 
              width: '20%',
              backgroundColor: '#3B7F3B',
              fontWeight: 'bold',
            }}
          >
            Crear
          </Button>

        </Stack>
      </Container>
    </>
  );
}

export default App;
