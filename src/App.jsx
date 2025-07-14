import { ReactFlowProvider } from "reactflow";
import { useFlowStore } from "./hooks/useFlowStore";
import AppHeader from "./components/layouts/Header";
import FlowCanvas from "./components/flows/Canvas";
import NodesPanel from "./components/layouts/NodePanel";
import SettingsPanel from "./components/layouts/Setting";
function App() {
  const selectedNode = useFlowStore((state) => state.selectedNode);

  return (
    <ReactFlowProvider>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        width: '100%', 
      }}>
        <AppHeader />
        <main style={{ display: 'flex', flexGrow: 1, }}>
          {selectedNode && <SettingsPanel />}
          <div style={{ flexGrow: 1}}>
            <FlowCanvas />
          </div>
         
           <div style={{ width: '300px', }}>
            <NodesPanel />
          </div>
        </main>
      </div>
    </ReactFlowProvider> 
  );
}
export default App;