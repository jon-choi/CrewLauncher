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


// function createData(rows) {

  

//   return {
//     date,
//     timeEstimate,
//     history: [
//       {
//         client: 'Frank Reynolds',
//         address: '555 Rocket Man Boulevard',
//         phone: '(555) 867-5309',
//         package: 'Rocket Man Package',
//         jobNotes: 'Watch out for rockets',
//       },
//     ],
//   };
// }🚀🚀 Oct. 7 / 2021 🚀🚀

function Row(props) {
  

  const { jobs, timeEstimate, packageItem } = props;

  const [open, setOpen] = React.useState(false);
  
  const date = format(new Date(props.date), 'EEE dd MMM, yyyy')
// job = {
//         id: jobOfCrew.id,
//         clientName: clientOfJobs.name,
//         clientPhone: clientOfJobs.phone,
//         package: packageOfJobs.title,
//         address: contractOfJob.address,
//         jobNotes: contractOfJob.job_notes,
//         timeEstimate,
//         date
//     };
  
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
          {date}
        </TableCell>
        <TableCell align="right">{(timeEstimate < 1) ? '<1' : timeEstimate} Hours</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="card-bg" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="font-color" sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {jobs.clientName ?  jobs.clientName : packageItem/*props.date*/ } 
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>                   
                    <TableCell className="font-color" align="left"><b>Address</b></TableCell>
                    <TableCell className="font-color" align="right"><b>Notes</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.address}>
                      <TableCell className="font-color" component="th" scope="row">
                        {job.address}
                      </TableCell>
                      <TableCell className="font-color" align="right">{job.jobNotes}</TableCell>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     timeEstimate: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         client: PropTypes.string.isRequired,
//         address: PropTypes.string.isRequired,
//         phone: PropTypes.string.isRequired,
//         package: PropTypes.string.isRequired,
//         jobNotes: PropTypes.string.isRequired
//       }),
//     ).isRequired,
//     date: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Job #1', '1hr'),
//   createData('Job #2', '45 mins'),
//   createData('Job #3', '30 mins'),
//   createData('Job #4', '2.5 hrs'),
//   createData('Job #5', '90 mins'),
// ];

export default function CollapsibleTable(props) {

  const { rows } = props;

  return (
    <div >
    <TableContainer sx={{mt: 8, minWidth: '100%', maxWidth: '100%'}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className="page-header"> 
            <TableCell />
            <TableCell> 
              <Typography className="font-color">
                Launch Info
                </Typography>
                </TableCell>
            <TableCell className="font-color" align="right"><b>Time Estimate</b></TableCell>
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