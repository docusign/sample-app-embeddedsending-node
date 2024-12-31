import { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { api } from '../../../api';
import { envelopesLoaded } from '../../../store/actions/envelopes.action';
import createPrefixedLogger from '../../../helpers/logger';
import t from '../../../helpers/t';
import EnvelopesTableRow from './EnvelopesTableRow';
import BaseTable from '../../../components/BaseTable/BaseTable';
import NoEnvelopesBanner from './NoEnvelopesBanner';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';
import styles from './EnvelopesTable.module.css';

const logger = createPrefixedLogger('EnvelopesList');

const EnvelopesTable = () => {
  const envelopesIds = useSelector(state => state.envelopes.ids);
  const envelopes = useSelector(state => state.envelopes.list);
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshEnvelopes = async () => {
      try {
        const reduxState = store.getState();
        const envelopeIds = reduxState.envelopes.ids;
        const response = await api.envelopes.getEnvelopes(envelopeIds);
        const newEnvelopes = response.data.envelopes;
        dispatch(envelopesLoaded(newEnvelopes));
      } catch (e) {
        logger.error('Unexpected error while refreshing envelopes', e);
      }
    };
    refreshEnvelopes();
  }, [store, dispatch]);

  if (envelopesIds.length === 0) {
    return <NoEnvelopesBanner className={styles.noEvelopesBanner} />;
  }

  if (!envelopes) {
    return (
      <div className="alert alert-primary" role="alert">
        {t.envelopes.loading}
      </div>
    );
  }
  return (
    <BaseTable className={styles.envelopesTable}>
      <thead>
        <tr>
          <th scope="col">{t.envelopes.envelopeContacts}</th>
          <th scope="col">{t.envelopes.envelopeName}</th>
          <th scope="col">{t.envelopes.envelopeStatus}</th>
          <th scope="col">{t.envelopes.envelopeTimestamp}</th>
          <th scope="col" className={baseTableStyles.stickyColumn}>
            <span className="visually-hidden">{t.envelopes.envelopeAction}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {envelopes.map(env => (
          <EnvelopesTableRow key={env.envelopeId} envelope={env} />
        ))}
      </tbody>
    </BaseTable>
  );
};

export default EnvelopesTable;
