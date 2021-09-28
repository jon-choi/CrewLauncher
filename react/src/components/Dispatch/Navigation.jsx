import {  Link, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';

const Navigation = () => {
  const { url } = useRouteMatch();

  return (
    <>

      <div><Link to={`${url}/jobs/:id`}>Job Edit Form</Link></div>
      <div><Link to={`${url}/contracts`}>Contracts</Link></div>
      <div><Link to={`${url}/contracts/:id`}>Contract Edit Form</Link></div>
      <div><Link to={`${url}/contracts/new`}>New Contract Form</Link></div>
      <div><Link to={`${url}/crews`}>Crews</Link></div>
      <div><Link to={`${url}/clients`}>Clients</Link></div>
      <div><Link to={`${url}/packages/new`}>New Package Form</Link></div>

    </>
  );
};

export default Navigation;