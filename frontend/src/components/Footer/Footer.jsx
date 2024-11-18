export const Footer = () => {


  const submitText = () => {
    document.querySelector("#submit-text-form").requestSubmit();
  };

  return (
    <footer>
      <div className="f-options">
        <button className="f-submit-ticket" onClick={submitText}>Submit as Pending</button>
      </div>
    </footer>
  );
};
