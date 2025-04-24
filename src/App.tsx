import './App.css'
import { NewsCard } from '@components';
import { newsResponseMock, duplicatesResponseMock } from './api/getNewsMock';

function App() {
  return (
    <>
      <NewsCard newsData={newsResponseMock} duplicatesData={duplicatesResponseMock}/>
    </>
  )
}

export default App
