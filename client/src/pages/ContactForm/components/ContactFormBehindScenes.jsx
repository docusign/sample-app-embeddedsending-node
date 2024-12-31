import BehindScenesContainer from '../../../components/BehindScenes/BehindScenesContainer';
import BehindScenesSection from '../../../components/BehindScenes/BehindScenesSection';
import t from '../../../helpers/t';

const ContactFormBehindScenes = () => {
  return (
    <BehindScenesContainer>
      <BehindScenesSection title={t.behindScenesCommon.scenarioOverview}>
        {t.contactForm.behindScenes.scenarioOverview}
      </BehindScenesSection>
    </BehindScenesContainer>
  );
};

export default ContactFormBehindScenes;
