import { AppBar, Toolbar, Typography } from "@mui/material";
import { Camera } from '@mui/icons-material';

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Camera sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          FINNOMENA
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
