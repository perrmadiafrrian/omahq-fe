export default function errorResponseHandler(response, addAlert = () => {}) {
  try {
    const { errors } = response.data;
    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((v, i) => {
          addAlert({
            message: v.message,
            title: response.statusText,
            type: "fail",
          });
        });
      } else {
        addAlert({
          message: errors.message,
          title: response.statusText,
          type: "fail",
        });
      }
    }
  } catch (e) {
    console.log(`errorResponseHandle Malfunctioned: ${e.message}`);
  }
}
