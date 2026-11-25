import { useState } from "react";

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};

export default useForm;