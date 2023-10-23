const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const className = type === "error" ? "error" : "notification";
  console.log("Notification Type:", type, "Class Name:", className);

  return <div className={className}>{message}</div>;
};

export default Notification;
