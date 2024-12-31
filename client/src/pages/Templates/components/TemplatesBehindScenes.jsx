import BehindScenesContainer from '../../../components/BehindScenes/BehindScenesContainer';
import BehindScenesSection from '../../../components/BehindScenes/BehindScenesSection';
import TextWithAnchorsMarkup from '../../../components/BehindScenes/TextWithAnchorsMarkup';
import t from '../../../helpers/t';

const TemplatesBehindScenes = () => {
  return (
    <BehindScenesContainer>
      <BehindScenesSection title={t.behindScenesCommon.scenarioOverview}>
        {t.templates.behindScenes.scenarioOverview}
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.codeFlow}>
        <TextWithAnchorsMarkup>{t.templates.behindScenes.codeFlow}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step1}>
        <TextWithAnchorsMarkup>{t.templates.behindScenes.step1}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step2}>
        <TextWithAnchorsMarkup>{t.templates.behindScenes.step2}</TextWithAnchorsMarkup>
      </BehindScenesSection>
      <BehindScenesSection title={t.behindScenesCommon.step3}>
        <TextWithAnchorsMarkup>{t.templates.behindScenes.step3}</TextWithAnchorsMarkup>
      </BehindScenesSection>
    </BehindScenesContainer>
  );
};

export default TemplatesBehindScenes;
