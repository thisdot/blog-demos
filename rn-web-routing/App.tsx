import { StatusBar } from 'expo-status-bar';
import Routes from './navigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}
