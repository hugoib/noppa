import { createBrowserRouter } from 'react-router-dom';
import { HomeScreen } from './components/HomeScreen';
import { GeneratingScreen } from './components/GeneratingScreen';
import { PreviewScreen } from './components/PreviewScreen';
import { DeployedScreen } from './components/DeployedScreen';
import { AppListScreen } from './components/AppListScreen';
import { TemplatesScreen } from './components/TemplatesScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/generating',
    element: <GeneratingScreen />,
  },
  {
    path: '/preview',
    element: <PreviewScreen />,
  },
  {
    path: '/deployed',
    element: <DeployedScreen />,
  },
  {
    path: '/apps',
    element: <AppListScreen />,
  },
  {
    path: '/templates',
    element: <TemplatesScreen />,
  },
]);
