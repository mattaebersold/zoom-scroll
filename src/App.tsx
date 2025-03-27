import "./index.css";
import ZoomScroll from './components/ZoomScroll';

export function App() {
  return (
    <div className="relative">
      <h1 className="p-4 text-center text-3xl font-bold">Zoom Scroll Test</h1>

      {/* container */}
      <div className="relative">
        <ZoomScroll />
      </div>
    </div>
  );
}

export default App;
