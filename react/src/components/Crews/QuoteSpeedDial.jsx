import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import StarRateIcon from '@mui/icons-material/StarRate';

export default function BasicSpeedDial(props) {
  const { onChange, packages, selectedPackage } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Box sx={{ top: 0, right:0, position: "absolute", width: 320, height: 736, transform: 'translateZ(0px)', flexGrow: 1 }}>
      
      {packages && <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', right: 10, top: 0}}
        icon={selectedPackage ? <Avatar alt={selectedPackage.title} src={selectedPackage.image} /> : <SpeedDialIcon />}
        direction='down'
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}

      >
        
        {packages.map((packageItem) => (
          <SpeedDialAction
            key={packageItem.id}
            icon={<StarRateIcon />}
            tooltipTitle={`${packageItem.title}\nSize Range ${packageItem.size_range_string}`}
            onClick={() => onChange(packageItem)}
            sx={{mb:5, zIndex:1000000, justifyContent: "right"}}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
        <Backdrop open={open} >
        </Backdrop>
      </SpeedDial>}
      
    </Box>
  );
}

