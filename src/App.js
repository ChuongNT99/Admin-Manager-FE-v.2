import './App.scss';
import Header from './components/Header';
// import ListRoom from './components/ListRoom';
// import Form from "./components/Form";
import Home from './components/Home';
const App = () => {
  return (
    <div className='app-container'>
      {/* <Header />
      <ListRoom /> */}
      {/* <Form/> */}
      <Header/>
      <Home/>
    </div>
  );
};
export default App;
