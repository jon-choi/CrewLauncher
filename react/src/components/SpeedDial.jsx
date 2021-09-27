import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Avatar from '@mui/material/Avatar';

// const actions = [
//   { icon: <FileCopyIcon />, name: 'Copy' },
//   { icon: <SaveIcon />, name: 'Save' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
// ];

export default function BasicSpeedDial(props) {
  const { onClick, crews, selectedCrew } = props;

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={selectedCrew ? <Avatar alt={selectedCrew.foreman_name} src={selectedCrew.avatar} /> : <SpeedDialIcon />}
      >
        {crews.map((crew) => (
          <SpeedDialAction
            key={crew.foreman_name}
            icon={<Avatar alt={crew.foreman_name} src={crew.avatar}/>}
            tooltipTitle={crew.foreman_name}
            onClick={onClick(crew.id)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}