const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Notification;
