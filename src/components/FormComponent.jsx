import React from "react";
import { useForm } from "react-hook-form";
 
const FormComponent = ({ onAddData }) => {
  const { register, handleSubmit, reset } = useForm();
 
  const onSubmit = (data) => {
    onAddData(data);
    reset(); // Clear the form after submission
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name", { required: true })} />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
 
export default FormComponent;