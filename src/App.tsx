import './App.css'
import { NewsCard, HighlightedTextarea } from '@components';
import { newsResponseMock, duplicatesResponseMock } from './api/getNewsMock';

function App() {
  return (
    <>
      {/* <NewsCard newsData={newsResponseMock} duplicatesData={duplicatesResponseMock}/> */}
      <HighlightedTextarea/>
    </>
  )
}

export default App
