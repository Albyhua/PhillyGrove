async function createPostHandler(event) {
  event.preventDefault();

  document.location.replace("/dashboard/new");
}

document
  .querySelector("#new-event-form")
  .addEventListener("click", createPostHandler);
