import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useStore } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import MyButton from '../../components/MyButton/MyButton';
import LabeledInput from './components/LabeledInput';
import t from '../../helpers/t';
import countries from '../../assets/countries.json';
import withAuth from '../../hocs/withAuth/withAuth';
import { addContact, editContact } from '../../store/actions/contacts.action';
import { AppRoute, USA_COUNTRY_NAME } from '../../constants';
import ContactFormBehindScenes from './components/ContactFormBehindScenes';
import StateInput from './components/StateInput';
import styles from './ContactForm.module.css';

// https://stackoverflow.com/a/18376246
const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const schema = yup
  .object({
    name: yup.string().required().max(50),
    email: yup.string().required().email(),
    phone: yup.string().required().matches(phoneRegExp),
    organization: yup.string().required(),
    organizationStreet1: yup.string().required(),
    organizationStreet2: yup.string(),
    organizationCity: yup.string().required(),
    organizationState: yup.string().required(),
    organizationZip: yup.string().required(),
    organizationCountry: yup.string().required(),
  })
  .required();

const ContactFormNonAuth = () => {
  const routeParams = useParams();
  const contactId = Number(routeParams.contactId);
  const store = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: () => {
      const reduxState = store.getState();
      const contact = reduxState.contacts.list.find(c => c.id === contactId);
      return Promise.resolve({
        name: contact?.name ?? '',
        email: contact?.email ?? '',
        phone: contact?.phone ?? '',
        organization: contact?.organization ?? '',
        organizationStreet1: contact?.organizationAddress.street1 ?? '',
        organizationStreet2: contact?.organizationAddress.street2 ?? '',
        organizationCity: contact?.organizationAddress.city ?? '',
        organizationState: contact?.organizationAddress.state ?? '',
        organizationZip: contact?.organizationAddress.zip ?? '',
        organizationCountry: contact?.organizationAddress.country ?? USA_COUNTRY_NAME,
      });
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveContact = formData => {
    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      organizationAddress: {
        street1: formData.organizationStreet1,
        street2: formData.organizationStreet2,
        city: formData.organizationCity,
        state: formData.organizationState,
        zip: formData.organizationZip,
        country: formData.organizationCountry,
      },
    };
    if (contactId) {
      dispatch(editContact(contactId, contactData));
    } else {
      dispatch(addContact(contactData));
    }
    navigate(AppRoute.CONTACTS);
  };

  const headerText = contactId ? t.contactForm.editContact : t.contactForm.addContact;
  return (
    <AuthLayout behindScenesContentNode={<ContactFormBehindScenes />}>
      <main className={styles.content}>
        <h1 className={styles.header}>{headerText}</h1>
        <form onSubmit={handleSubmit(saveContact)}>
          <fieldset>
            <legend className={styles.fieldsetHeader}>{t.contactForm.generalInfo}</legend>
            <div className={styles.inputsTable}>
              <LabeledInput name="name" errors={errors} register={register} />
              <LabeledInput name="email" errors={errors} register={register} />
              <LabeledInput name="phone" errors={errors} register={register} />
              <LabeledInput name="organization" errors={errors} register={register} />
            </div>
          </fieldset>
          <fieldset>
            <legend className={styles.fieldsetHeader}>{t.contactForm.companyAddress}</legend>
            <div className={styles.inputsTable}>
              <LabeledInput
                name="organizationStreet1"
                errors={errors}
                register={register}
                className={styles.wideInput}
              />
              <LabeledInput
                name="organizationStreet2"
                errors={errors}
                register={register}
                className={styles.wideInput}
              />
              <LabeledInput name="organizationCountry" errors={errors} register={register} formElementType="select">
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </LabeledInput>
              <LabeledInput name="organizationCity" errors={errors} register={register} />
              <StateInput
                name="organizationState"
                errors={errors}
                register={register}
                countryFieldName="organizationCountry"
                control={control}
              />
              <LabeledInput name="organizationZip" errors={errors} register={register} />
            </div>
          </fieldset>
          <div className={styles.buttons}>
            <MyButton type="submit" className={styles.submitButton}>
              {headerText}
            </MyButton>
            <MyButton variant="secondary" to={AppRoute.CONTACTS} className={styles.backButton}>
              {t.contactForm.back}
            </MyButton>
          </div>
        </form>
      </main>
    </AuthLayout>
  );
};

const ContactForm = withAuth(ContactFormNonAuth);
export default ContactForm;
