import AppRoutes from './App.routes';
import { UserProvider } from './src/providers/User.provider';

export default function App() {
  return <UserProvider>
        <AppRoutes />
      </UserProvider>
}
