import { Link } from 'react-router-dom';
import { Drawer, Button, Divider, Stack, Card, Typography, CardActions } from '@mui/material';
const NavigationQuotes = (props) => {
  const { open, setOpen, quotes } = props;

  let key = -1;
  const quoteCards = quotes.map(quote => {
    key++;
    return (
    <Card key={key}>
      <CardActions>
        <Button component={Link} to={`/dispatch/contracts/quotes/${key}`}>Handle Quote</Button>
      </CardActions>
      <Typography>
        {quote.clientName}
      </Typography>
      <Typography>
        {quote.clientEmail}
      </Typography>
      <Typography>
        {quote.clientPhone}
      </Typography>
      <Typography>
        {quote.selectedPackage && quote.selectedPackage.title}
      </Typography>
    </Card>);
  });


  return (
    <Drawer open={open} variant='persistent' position='static' anchor='left'
      sx={{display: { xs: 'block', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
    }}>
      <Button><h1 onClick={()=> setOpen(false)}>Crew🚀Launcher</h1></Button>
      <Divider />
      <Stack>
        {quotes.length > 0 ? quoteCards : (<h3>No quotes :)</h3>)}
      </Stack>
    </Drawer>
  )
}

export default NavigationQuotes;