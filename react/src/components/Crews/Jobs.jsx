import { useParams } from 'react-router-dom'

import Card from '@mui/material/Card';

const Jobs = () => {
  const params = useParams();
  

  return (
    <Card>
    <h1>/crews/{params.id}/jobs</h1>
    Card
    </Card>
  );
};

export default Jobs;