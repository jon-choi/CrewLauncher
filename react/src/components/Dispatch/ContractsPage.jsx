import MediaCard from "../MediaCard";
import {  Link, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';

const ContractsPage = (props) => {
  const { contractsInfo, onEdit } = props
  const { url } = useRouteMatch;
  const linkToEdit = 

  const contractCard = contractsInfo.map(contract => {
    return <MediaCard
    key={contract.id}
    compClass="contract-card"
    onClick={onEdit}
    />
  })

  return (
    <h1>contractInfo: </h1>
  );
};

export default ContractsPage;
