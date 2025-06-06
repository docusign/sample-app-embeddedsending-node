import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../api';
import styles from './NavigatorContent.module.css';

const NavigatorContent = () => {
  const [error, setError] = useState(null);
  const iframe = useRef(null);
  const userEmail = useSelector(state => state.auth.userEmail);
  const userName = useSelector(state => state.auth.userName);

  useEffect(() => {
    const initNavigator = async () => {
      try {
        const response = await api.navigator.getData();
        const { token } = response.data;
        console.log('Navigator token:', token);
        if (!iframe.current) return;

        // Configure the iframe
        iframe.current.src = 'https://apps-d.docusign.com/navigator-for-partners';
        
        const handleIframeLoad = () => {
          const dataToSend = {
            message: 'Embedded-Navigator-View',
            authInfo: { access_token: token },
            userInfo: {
              sub: '13f69e9e-d3ec-4cfe-b551-5ff33b1751c8',
              name: "prudhvi nag",
              email: "prudhvinag@dsxtr.com",
              accounts: [{
                account_id: 'c9b55f81-6261-4a6e-b53f-59a2d341c10f',
                name: userName,
                is_default: true,
                account_name: userName,
                base_uri: 'https://demo.docusign.net',
              }]
            },
            envelopeIds: [],
            currentAccount: 'c9b55f81-6261-4a6e-b53f-59a2d341c10f',
            timestamp: new Date().toISOString()
          };

          iframe.current.contentWindow.postMessage(
            dataToSend,
            iframe.current.src
          );
        };

        iframe.current.onload = handleIframeLoad;

      } catch (err) {
        setError(err.message);
        console.error('Navigator initialization error:', err);
      }
    };

    initNavigator();
  }, [userEmail, userName]);

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.widget}>
        <h2 className={styles.widgetTitle}>DocuSign Navigator</h2>
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframe}
            id="navigatorFrame"
            className={styles.navigatorFrame}
            title="DocuSign Navigator"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigatorContent;