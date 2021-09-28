
import Drawer from '../Drawer'
import Quote from './Quote'

const Navigation = (props) => {

  const { packages, onSubmitQuote } = props
  return (
    <div>
      <div>
        <img />
      </div>
      <h1>
          <Drawer buttonText={'Quote'} items={<Quote packages={packages} onSubmitQuote={onSubmitQuote} />} />
      </h1>
    </div>
  );
};

export default Navigation;