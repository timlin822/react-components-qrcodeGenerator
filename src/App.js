import QRCodeGenerator from 'components/qrCode/QRCodeGenerator';

import './App.css';

function App() {
  return (
    <section className="section-padding bg-height">
      <div className="container container-padding">
        <QRCodeGenerator />
      </div>
    </section>
  );
}

export default App;