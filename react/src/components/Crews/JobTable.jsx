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
import {format} from 'date-fns'


function Row(props) {
  

  const { jobs, timeEstimate, packageItem } = props;

  const [open, setOpen] = React.useState(false);
  
  const date = format(new Date(props.date), 'EEE dd MMM, yyyy')
  
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
          <b>{date}</b>
        </TableCell>
        <TableCell align="right"><b>{(timeEstimate < 1) ? '<1' : timeEstimate} Hours</b></TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="card-bg" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="font-color" sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                {jobs.clientName ?  jobs.clientName : packageItem/*props.date*/ } 
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>                   
                    <TableCell className="font-color" align="left">
                      <Typography variant="h6">
                      Address
                      </Typography>
                      </TableCell>
                    <TableCell className="font-color" align="right">
                      <Typography variant="h6">
                      Notes
                      </Typography>
                      </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.address}>
                      <TableCell className="font-color" component="th" scope="row">
                        <Typography variant="h6">
                        {job.address}
                        </Typography>
                      </TableCell>
                      <TableCell className="font-color" align="right">
                        <Typography variant="h6">
                        {job.jobNotes}
                        </Typography>
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

export default function CollapsibleTable(props) {

  const { rows } = props;

  return (
    <div >
    <TableContainer sx={{mt: 8, justifyContent: 'center', alignSelf: 'center'}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className="page-header"> 
            <TableCell />
            <TableCell> 
              <Typography className="font-color" variant="h6">
                Launch Info
                </Typography>
                </TableCell>
            <TableCell >
              <Typography className="font-color" align="right" variant="h6">
              Time Estimate
              </Typography>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.count} jobs={row.rows} date={row.date} timeEstimate={row.timeEstimate} packageItem={row.packageItem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}