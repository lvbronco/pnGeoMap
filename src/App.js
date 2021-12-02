import './App.css';
import PNGeoMap from './components/PNGeoMap';
import config from './config/keys.json';

function App() {
  return (
    <div className="App">
      <div>
        This is a test
      </div>
      <div className="GeoMap">
        <PNGeoMap 
          apiKey={config.apiKey}
          publishKey={config.publishKey}
          subscribeKey={config.subscribeKey}
          uuid='laptop-testing'
          initialCenter={
            {
              "lat": 30.220720,
              "lng": -97.733230
            }
          }
        />
      </div>
    </div>
  );
}

export default App;

/*
const pubnub = new PubNub({
  publishKey: 'pub-c-14d052d1-9847-41a1-90ab-b75467751c0d',
  subscribeKey: 'sub-c-d255c2c2-52c6-11ec-8b9e-da88ab2aee1c',
  uuid: 'laptop-testing'
});
*/