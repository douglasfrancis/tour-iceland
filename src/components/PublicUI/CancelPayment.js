import React from "react";

function Cancel() {
  return (
    <>
      <h4>Oops! Your payment has been cancelled.</h4>
      <p>
        We appreciate your business! If you have any questions, please email us
        at
        <a href="mailto:orders@example.com">orders@example.com</a>.
		<br>
		</br>
		<a href={'http://localhost:3000/'} target="_blank" rel="noopener noreferrer">
		Back to home page
		</a>
      </p>
      <div>
        <button> Go to Home page</button>
      </div>
    </>
  );
}

export default Cancel;
