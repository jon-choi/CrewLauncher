import MediaCard from "../MediaCard";
import {  Link, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import { format } from 'date-fns'

const ContractsPage = (props) => {
  const { contractsInfo, onEdit } = props
  const { url } = useRouteMatch;
  const linkToEdit = <Link to={`${url}/contracts/:id`}></Link>
 
  const contractCards = contractsInfo.map(contract => {
    const nextVisit = format(new Date(), 'EEE MMM dd')
    const header =`${contract.clientName}\n${contract.clientEmail}`
    const body =
    `Address: ${contract.address}
    \nStart Date:${contract.start_date}
    \nPackage length: ${contract.packageLength}
    \nJob Notes: ${contract.job_notes}
    \nNext Visit: ${nextVisit}`
    return <MediaCard
    key={contract.id}
    compClass="contract-card"
    onClick={linkToEdit}
    header={header}
    body={body}
    />
  })

  return (
    <>
    <h1>contractInfo: </h1>
    {contractCards}
    </>
  );
};

export default ContractsPage;
