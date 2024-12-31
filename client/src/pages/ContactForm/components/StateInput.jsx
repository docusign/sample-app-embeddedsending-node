import { useWatch } from 'react-hook-form';
import { USA_COUNTRY_NAME } from '../../../constants';
import states from '../../../assets/states.json';
import LabeledInput from './LabeledInput';

const StateInput = ({ name, errors, register, control, countryFieldName }) => {
  const country = useWatch({ control, name: countryFieldName });
  const isFreeText = country !== USA_COUNTRY_NAME;

  if (isFreeText) {
    return <LabeledInput name={name} errors={errors} register={register} />;
  }

  return (
    <LabeledInput name={name} errors={errors} register={register} formElementType="select">
      {states.map(state => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </LabeledInput>
  );
};

export default StateInput;
