import withAuth from '../../hocs/withAuth/withAuth.jsx';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import t from '../../helpers/t.js';
import SidebarLayoutFrame from '../../components/SidebarLayoutFrame/SidebarLayoutFrame.jsx';
import NavigatorContent from './components/NavigatorContent.jsx';
import NavigatorBehindScenes from './components/NavigatorBehindScenes.jsx';

const NavigatorNonAuth = () => {
  return (
    <AuthLayout behindScenesContentNode={<NavigatorBehindScenes />}>
      <SidebarLayoutFrame>
        <h1>{t.tabs.navigator}</h1>
        <NavigatorContent />
      </SidebarLayoutFrame>
    </AuthLayout>
  );
};

const Navigator = withAuth(NavigatorNonAuth);
export default Navigator;