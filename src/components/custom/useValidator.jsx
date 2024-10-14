export default function useValidator(errors, field) {
  return (
    errors?.[field]?.length &&
    errors[field].map((error, index) => (
      <div key={index} className="alert alert-danger">
        {error}
      </div>
    ))
  );
}
