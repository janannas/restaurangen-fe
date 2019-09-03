//Necessary configuration to be able to test in enzyme: Tom
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });