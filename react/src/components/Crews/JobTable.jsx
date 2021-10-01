import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getJobsByCrew } from './crewsDataHelper';


function createData(date, timeEstimate) {

  

  return {
    date,
    timeEstimate,
    history: [
      {
        client: 'Frank Reynolds',
        address: '555 Rocket Man Boulevard',
        phone: '(555) 867-5309',
        package: 'Rocket Man Package',
        jobNotes: 'Watch out for rockets',
      },
    ],
  };
}

function Row(props) {
  

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  


  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.timeEstimate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {props.name ?  props.name :"Frank Reynolds"/*props.date*/ } 
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    { props.name && <><TableCell>Address</TableCell>
                    <TableCell>Phone Number</TableCell></> }
                    <TableCell align="right">"Package"</TableCell>
                    <TableCell align="right">Job Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.address}>
                      <TableCell component="th" scope="row">
                        {historyRow.address}
                      </TableCell>
                      <TableCell>{historyRow.phone}</TableCell>
                      <TableCell align="right">{historyRow.package}</TableCell>
                      <TableCell align="right">
                        {historyRow.jobNotes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    timeEstimate: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        client: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        package: PropTypes.string.isRequired,
        jobNotes: PropTypes.string.isRequired
      }),
    ).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('Job #1', '1hr'),
  createData('Job #2', '45 mins'),
  createData('Job #3', '30 mins'),
  createData('Job #4', '2.5 hrs'),
  createData('Job #5', '90 mins'),
];

export default function CollapsibleTable() {
  return (
    <h1>🚀🚀 Oct. 7 / 2021 🚀🚀
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> 
              <Typography sx={{ color: 'text.primary' }}>
                Oct. 7/2021
                </Typography>
                </TableCell>
            <TableCell align="right">Time Estimate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.date} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </h1>
  );
}