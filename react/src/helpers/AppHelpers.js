const { format, addDays, subDays, isSameDay, isYesterday, isToday, isTomorrow } = require('date-fns')

const getClientId = (client, clientList) => {
  const { email } = client;
  const existingClient = clientList.filter(c => c.email === email);
  if (existingClient.length > 0) {
    return existingClient[0].id;
  } else {
    return false;
  }
};

const getDayInfo = function(jobs, crews, contracts, packages, clients, crewId = 0) {
  const days = [ // shows 5 days
    [format(subDays(new Date(), 1),'EEEE, MMM dd')],
    [format(new Date(),'EEEE, MMM dd')],
    [format(addDays(new Date(), 1),'EEEE, MMM dd')],
    [format(addDays(new Date(), 2),'EEEE, MMM dd')],
    [format(addDays(new Date(), 3),'EEEE, MMM dd')]
  ];
  // const [ [yesterday], [today], [tomorrow], [fourthDay], [fifthDay], [lastDay] ] = days
  for (const job of jobs) {
    const contractOfJob = contracts.filter(contract => {
      return contract.id === job.contract_id
    })[0];
    const crewOfJob = crews.filter(crew => {
      return crew.id === job.crew_id
    })[0];
    const packageOfJob = packages.filter(packageItem => {
      return packageItem.id === contractOfJob.package_id
    })[0];
    const clientOfJob = clients.filter(client => {
      return client.id === contractOfJob.client_id
    })[0];
    const day = {/* date */job, contractOfJob, crewOfJob, packageOfJob, clientOfJob }

    if ((!crewId || crewId === day.crewOfJob.id) && isYesterday(new Date(day.job.date))) {
      days[0].push(day)
    }
    if ((!crewId || crewId === day.crewOfJob.id) && isToday(new Date(day.job.date))) {
      days[1].push(day)
    }
    if ((!crewId || crewId === day.crewOfJob.id) && isTomorrow(new Date(day.job.date))) {
      days[2].push(day)
    }
    if ((!crewId || crewId === day.crewOfJob.id) && isSameDay(new Date(day.job.date), addDays(new Date(), 2))) {
      days[3].push(day)
    }
    if ((!crewId || crewId === day.crewOfJob.id) && isSameDay(new Date(day.job.date), addDays(new Date(), 3))) {
      days[4].push(day)
    }
  }
  return days;
};

const generateJobDates = (startDate, contractLength, visitInterval) => {
  const jobs = [];
  const jobCount = Math.round(parseInt(contractLength) / parseInt(visitInterval));

  for (let x = 0; x < jobCount; x++) {
    jobs.push({
      date: addDays(new Date(startDate), x * visitInterval)
    });
  }
  return jobs;
};


export { getClientId, getDayInfo, generateJobDates }