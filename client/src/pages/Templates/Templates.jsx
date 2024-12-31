import withAuth from '../../hocs/withAuth/withAuth.jsx';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import t from '../../helpers/t.js';
import TemplatesTable from './components/TemplatesTable.jsx';
import TemplatesBehindScenes from './components/TemplatesBehindScenes.jsx';
import SidebarLayoutFrame from '../../components/SidebarLayoutFrame/SidebarLayoutFrame.jsx';

const TemplatesNonAuth = () => {
  return (
    <AuthLayout behindScenesContentNode={<TemplatesBehindScenes />}>
      <SidebarLayoutFrame>
        <h1>{t.tabs.templates}</h1>
        <TemplatesTable />
      </SidebarLayoutFrame>
    </AuthLayout>
  );
};

const Templates = withAuth(TemplatesNonAuth);
export default Templates;
