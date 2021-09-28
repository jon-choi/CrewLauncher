import MediaCard from "../MediaCard";
import {  Link, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';

const ContractsPage = (props) => {
  const { contractsInfo, onEdit } = props
  const { url } = useRouteMatch;
  const linkToEdit = <Link to={`${url}/contracts/:id`}></Link>
 
  const contractCard = contractsInfo.map(contract => {
    const header = contract
    return <MediaCard
    key={contract.id}
    compClass="contract-card"
    onClick={linkToEdit}
    header={"text"}
    body={"text"}
    />
  })

  return (
    <h1>contractInfo: </h1>
  );
};

export default ContractsPage;
