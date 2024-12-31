import BehindScenesContainer from '../../../components/BehindScenes/BehindScenesContainer';
import BehindScenesSection from '../../../components/BehindScenes/BehindScenesSection';
import TextWithAnchorsMarkup from '../../../components/BehindScenes/TextWithAnchorsMarkup';
import t from '../../../helpers/t';

const EnvelopesBehindScenes = () => {
  return (
    <BehindScenesContainer>
      <BehindScenesSection title={t.behindScenesCommon.scenarioOverview}>
        {t.envelopes.behindScenes.scenarioOverview}
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.codeFlow}>
        <TextWithAnchorsMarkup>{t.envelopes.behindScenes.codeFlow}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step1}>
        <TextWithAnchorsMarkup>{t.envelopes.behindScenes.step1}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step2}>
        <TextWithAnchorsMarkup>{t.envelopes.behindScenes.step2}</TextWithAnchorsMarkup>
      </BehindScenesSection>
    </BehindScenesContainer>
  );
};

export default EnvelopesBehindScenes;
