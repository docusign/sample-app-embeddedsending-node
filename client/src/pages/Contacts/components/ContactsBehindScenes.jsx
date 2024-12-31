import BehindScenesContainer from '../../../components/BehindScenes/BehindScenesContainer';
import BehindScenesSection from '../../../components/BehindScenes/BehindScenesSection';
import TextWithAnchorsMarkup from '../../../components/BehindScenes/TextWithAnchorsMarkup';
import t from '../../../helpers/t';

const ContactsBehindScenes = () => {
  return (
    <BehindScenesContainer>
      <BehindScenesSection title={t.behindScenesCommon.scenarioOverview}>
        {t.contacts.behindScenes.scenarioOverview}
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.codeFlow}>
        <TextWithAnchorsMarkup>{t.contacts.behindScenes.codeFlow}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step1}>
        <TextWithAnchorsMarkup>{t.contacts.behindScenes.step1}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step2}>
        <TextWithAnchorsMarkup>{t.contacts.behindScenes.step2}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step3}>
        <TextWithAnchorsMarkup>{t.contacts.behindScenes.step3}</TextWithAnchorsMarkup>
      </BehindScenesSection>
    </BehindScenesContainer>
  );
};

export default ContactsBehindScenes;
