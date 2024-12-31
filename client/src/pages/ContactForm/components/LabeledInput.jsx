import React from 'react';
import clsx from 'clsx/lite';
import t from '../../../helpers/t';
import styles from './LabeledInput.module.css';

const LabeledInput = ({ name, register, errors, className = null, formElementType = 'input', children = null }) => {
  const error = errors[name];
  const formElement = React.createElement(
    formElementType,
    {
      id: name,
      name,
      className: clsx(styles.formElement, error && styles.formElementInvalid),
      ...register(name),
    },
    children
  );
  return (
    <div className={clsx(styles.group, className)}>
      <label htmlFor={name}>{t.contactForm.field[name]}</label>
      {formElement}
      {!!error && (
        <p className={styles.error} role="alert">
          {error.type === 'required' ? t.contactForm.error.required : t.contactForm.error.invalid}
        </p>
      )}
    </div>
  );
};

export default LabeledInput;
