async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="event-title"]').value;
  const location = document.querySelector('input[name="event-location"]').value;
  const date = document.querySelector('input[name="event-date"]').value;
  const description = document
    .querySelector('textarea[name="event-description"]')
    .value.trim();
  const event_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${event_id}`, {
    method: "PUT",
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
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
