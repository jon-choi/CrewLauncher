import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Avatar from '@mui/material/Avatar';

export default function BasicSpeedDial(props) {
  const { onChange, packages, selectedPackage } = props;
  console.log(packages)

  return (
    <Box sx={{ height: 30, transform: 'translateZ(0px)', flexGrow: 1 }}>
      {packages && <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', right: 10}}
        icon={selectedPackage ? <Avatar alt={selectedPackage.title} src={selectedPackage.image} /> : <SpeedDialIcon />}
        direction='down'
      >
        {packages.map((packageItem) => (
          <SpeedDialAction
            key={packageItem.id}
            icon={<Avatar alt={packageItem.title} src={packageItem.image}/>}
            tooltipTitle={`${packageItem.title}\nSize Range ${packageItem.size_range_string}\n$${packageItem.flat_rate}\nEvery: ${packageItem.visit_interval_days}-days`}
            onClick={() => onChange(packageItem)}
          />
        ))}
      </SpeedDial>}
    </Box>
  );
}