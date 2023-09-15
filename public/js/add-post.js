async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="event-title"]').value;
  const event_description = document
    .querySelector('textarea[name="event-description"]')
    .value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      location,
      date,
      event_description,
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
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
