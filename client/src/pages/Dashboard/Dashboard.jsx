import withAuth from '../../hocs/withAuth/withAuth.jsx';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import t from '../../helpers/t.js';
import EnvelopesTable from './components/EnvelopesTable.jsx';
import EnvelopesBehindScenes from './components/EnvelopesBehindScenes.jsx';
import SidebarLayoutFrame from '../../components/SidebarLayoutFrame/SidebarLayoutFrame.jsx';

const DashboardNonAuth = () => {
  return (
    <AuthLayout behindScenesContentNode={<EnvelopesBehindScenes />}>
      <SidebarLayoutFrame>
        <h1>{t.tabs.dashboard}</h1>
        <EnvelopesTable />
      </SidebarLayoutFrame>
    </AuthLayout>
  );
};

const Dashboard = withAuth(DashboardNonAuth);
export default Dashboard;
