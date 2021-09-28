
import Drawer from '../Drawer'
import Quote from './Quote'

const Navigation = () => {
  const quote = <Quote /> 
  return (
    <div>
      <div>
        <img />
      </div>
      <h1>
          <Drawer buttonText={'Quote'} items={quote} />
      </h1>
    </div>
  );
};

export default Navigation;