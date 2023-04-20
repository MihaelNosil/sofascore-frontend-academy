import React, { PropsWithChildren } from 'react'
import './App.css';
import Fetch from './components/Fetch'
import Input from './components/Input'

const FETCH_COMPONENT = "Fetch";
const INPUT_COMPONENT = "Input";

function ComponentSelectContainer({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: '10px',
        borderBottom: '1px solid black',
        marginBottom: '10px'
      }}
    >
      {children}
    </div>
  );
}

function ComponentSelectButton(props: PropsWithChildren<{onClick: () => void}>) {
  const { onClick, children } = props;

  return (
    <button onClick={onClick} style={{ cursor: "pointer", fontSize: "16px" }}>
      {children}
    </button>
  );
}
function App() {
  const [component, setComponent] = React.useState(INPUT_COMPONENT);

  return (
    <div className="App">
      <ComponentSelectContainer>
        <ComponentSelectButton
          onClick={() => setComponent(INPUT_COMPONENT)}
        >
          {INPUT_COMPONENT}
        </ComponentSelectButton>
        <ComponentSelectButton
          onClick={() => setComponent(FETCH_COMPONENT)}
        >
          {FETCH_COMPONENT}
        </ComponentSelectButton>
      </ComponentSelectContainer>
      {component === INPUT_COMPONENT && <Input />}
      {component === FETCH_COMPONENT && <Fetch />}
    </div>
  );
}

export default App;
