import React from 'react';
import { Button, Box, Fab }  from '@material-ui/core';
import { NavigationIcon } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/AddIcon';
// import FavoriteIcon from '@material-ui/icons/FavoriteIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  return (
    <>
    <Button variant="contained" color="primary">
    Hello World
  </Button>
  <Box color="primary.main" bgcolor="secondary.main">Hello world</Box>
  {/* <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab> */}
<Fab color="secondar" aria-label="navigate">
  {/* <NavigationIcon  /> */}
  Navigate
</Fab>
<Fab disabled aria-label="like" >
  {/* <FavoriteIcon /> */}
  Fav
</Fab>
  </>

  );
}

export default App;
