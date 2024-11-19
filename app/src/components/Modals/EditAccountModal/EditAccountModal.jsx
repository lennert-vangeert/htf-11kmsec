import React, { useState, useEffect } from "react";
import style from "./EditAccountModal.module.css";

const EditAccountModal = ({ isOpen, onClose, onEdit, user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name in prevState.address) {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [name]: value,
          },
        };
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Voornaam is verplicht";
    if (!formData.lastName) newErrors.lastName = "Achternaam is verplicht";
    if (!formData.email) newErrors.email = "Email is verplicht";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onEdit(formData);
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>Account aanpassen</h2>
        <label className={style.form__label} htmlFor="firstName">
          Voornaam
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className={style.error}>{errors.firstName}</div>
          )}
        </label>
        <label className={style.form__label} htmlFor="lastName">
          Achternaam
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className={style.error}>{errors.lastName}</div>
          )}
        </label>

        <label className={style.form__label} htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className={style.error}>{errors.email}</div>}
        </label>

        <div className={style.modal__buttons}>
          <button
            onClick={onClose}
            className={`${style.modal__button} ${style.no}`}
          >
            Annuleren
          </button>
          <button
            onClick={handleSubmit}
            className={`${style.modal__button} ${style.yes}`}
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;
