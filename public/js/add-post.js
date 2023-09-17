async function newFormHandler(event) {
  event.preventDefault();
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  const title = document.querySelector('input[name="event-title"]').value;
  const location = document.querySelector('input[name="event-location"]').value;
  const date = document.querySelector('input[name="event-date"]').value;
  const description = document
    .querySelector('textarea[name="event-description"]')
    .value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      location,
      date,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-event-form")
  .addEventListener("submit", newFormHandler);
