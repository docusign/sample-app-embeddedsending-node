import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import TemplatesTableRow from './TemplatesTableRow';
import createPrefixedLogger from '../../../helpers/logger';
import { api } from '../../../api';
import { templatesLoaded } from '../../../store/actions';
import t from '../../../helpers/t';
import BaseTable from '../../../components/BaseTable/BaseTable';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';
import styles from './TemplatesTable.module.css';

const logger = createPrefixedLogger('TemplatesTable');

const TemplatesTable = () => {
  const templates = useSelector(state => state.templates.list);
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTemplates = async () => {
      try {
        const reduxState = store.getState();
        const templates = reduxState.templates.list;
        const templatesIds = templates.map(t => t.templateId);
        const response = await api.templates.getTemplates(templatesIds);
        const newTemplates = response.data.templates;
        dispatch(templatesLoaded(newTemplates));
      } catch (e) {
        logger.error('Unexpected error while refreshing templates', e);
      }
    };
    refreshTemplates();
  }, [store, dispatch]);

  if (!templates) {
    return (
      <div className="alert alert-primary" role="alert">
        {t.templates.loading}
      </div>
    );
  }

  return (
    <BaseTable className={styles.templatesTable}>
      <thead>
        <tr>
          <th scope="col">{t.templates.templateName}</th>
          <th scope="col" className={baseTableStyles.stickyColumn}>
            <span className="visually-hidden">{t.templates.templateAction}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {templates.map(t => (
          <TemplatesTableRow key={t.templateId} template={t} />
        ))}
      </tbody>
    </BaseTable>
  );
};

export default TemplatesTable;
