import { Provider as PaperProvider } from 'react-native-paper';

import AppRoutes from './App.routes';
import { UserProvider } from './src/providers/User.provider';

export default function App() {
  return <PaperProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </PaperProvider>;
}
