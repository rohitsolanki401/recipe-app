const Input = ({
  className,
  label,
  type,
  name,
  register,
  isUrl = false,
  errors,
  message,
}) => {
  const isUrlRule = {
    pattern:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  };

  let options = { required: true };

  if (isUrl) options = { required: true, ...isUrlRule };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className={className}>
        <input id={name} type={type} {...register(name, options)} />
        {errors[name]?.type === "required" && <span>{message}</span>}
        {isUrl && errors[name]?.type === "pattern" && (
          <span>Please add a valid URL</span>
        )}
      </div>
    </>
  );
};

export default Input;
