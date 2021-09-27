import { useParams } from 'react-router-dom'

const PackageForm = () => {

  const params = useParams();
  
  return (
    <h1>/dispatch/package/new
      New Package
    </h1>
  );
};

export default PackageForm;