import {
  Container,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TablePaginationActions from "./Components/TablePaginationActions";
import dayjs from "dayjs";
import Header from "./Components/Header";

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#F3F4F5",
      },
      primary: {
        main: "#FACD00",
      },
      // secondary: {
      //   main: "#1D1D1D",
      // },
    },
  });

  const [timeRange, setTimeRange] = useState("1D");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setTimeRange(newAlignment);
    }
  };

  const [data, setData] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("/fundranking", { params: { timerange: timeRange } })
      .then((response) => {
        const sorted = response.data.map((item, index) => {
          item.rank = index + 1;
          return item;
        });
        setData(sorted);
      })
      .catch((error) => {
        setData(null);
      });
  }, [timeRange]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 4 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Fund Ranking
          </Typography>
        </Container>
        <Container component="main">
          Select Time Range
          <Paper sx={{ mb: 2, mt: 2 }}>
            <Stack direction="row" spacing={4}>
              <ToggleButtonGroup
                value={timeRange}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                fullWidth
              >
                <ToggleButton
                  color="primary"
                  value="1D"
                  aria-label="left aligned"
                >
                  1 Day
                </ToggleButton>
                <ToggleButton color="primary" value="1W" aria-label="centered">
                  1 Week
                </ToggleButton>
                <ToggleButton color="primary" value="1M" aria-label="centered">
                  1 Month
                </ToggleButton>
                <ToggleButton
                  color="primary"
                  value="1Y"
                  aria-label="right aligned"
                >
                  1 Year
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Paper>
          {data ? (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 250 }}>Name</TableCell>
                    <TableCell align="right">Rank of fund</TableCell>
                    <TableCell align="right">Updated Date</TableCell>
                    <TableCell align="right">Performance</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((row, index) => (
                    <TableRow key={row.mstar_id}>
                      <TableCell component="th" scope="row">
                        {row.thailand_fund_code}
                      </TableCell>
                      <TableCell align="right">{row.rank}</TableCell>
                      <TableCell align="right">
                        {dayjs(row.nav_date).format("D MMMM YYYY")}
                      </TableCell>
                      <TableCell align="right">{row.nav_return}</TableCell>
                      <TableCell align="right">{row.nav}</TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          ) : null}
        </Container>
      </main>
      {/* Footer */}
    </ThemeProvider>
  );
}

export default App;
