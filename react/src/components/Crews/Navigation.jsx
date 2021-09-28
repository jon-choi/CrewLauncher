
import Drawer from '../Drawer'
import Quote from './Quote'

const Navigation = (props) => {

  const { packages } = props
  return (
    <div>
      <div>
        <img />
      </div>
      <h1>
          <Drawer buttonText={'Quote'} items={<Quote packages={packages} />} />
      </h1>
    </div>
  );
};

export default Navigation;