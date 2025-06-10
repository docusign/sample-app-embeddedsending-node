import BehindScenesContainer from '../../../components/BehindScenes/BehindScenesContainer';
import BehindScenesSection from '../../../components/BehindScenes/BehindScenesSection';
import TextWithAnchorsMarkup from '../../../components/BehindScenes/TextWithAnchorsMarkup';
import t from '../../../helpers/t';

const NavigatorBehindScenes = () => {
  return (
    <BehindScenesContainer>
      <BehindScenesSection title={t.behindScenesCommon.scenarioOverview}>
        {t.navigator.behindScenes.scenarioOverview}
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.codeFlow}>
        <TextWithAnchorsMarkup>{t.navigator.behindScenes.codeFlow}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step1}>
        <TextWithAnchorsMarkup>{t.navigator.behindScenes.step1}</TextWithAnchorsMarkup>
      </BehindScenesSection>
    </BehindScenesContainer>
  );
};

export default NavigatorBehindScenes;