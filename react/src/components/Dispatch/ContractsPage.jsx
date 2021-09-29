import MediaCard from "../MediaCard";
import { format } from 'date-fns'

const ContractsPage = (props) => {
  const { contractsInfo } = props

  const contractCards = contractsInfo.map(contract => {
    const nextVisit = format(new Date(contract.jobDate), 'EEE MMM d yyyy')
    const header =`${contract.clientName}\n${contract.clientEmail}`
    const body =
    `Address: ${contract.address}
    \nStart Date:${contract.start_date}
    \nPackage length: ${contract.packageLength}
    \nJob Notes: ${contract.job_notes}
    \nNext Visit: ${nextVisit}`
    const linkToEdit = `/dispatch/contracts/${contract.id}`;

    return <MediaCard
    key={contract.id}
    compClass="contract-card"
    link={linkToEdit}
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
