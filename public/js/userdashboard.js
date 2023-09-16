const newEventHandler = async (event) => {
  event.preventDefault();
  console.log(
  "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  )

  const title = document.querySelector("#event-title").value.trim();
  const description = document.querySelector("#event-desc").value.trim();

  console.log("description:", description)


  if (title && description) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response:", response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create event");
    }
  }

  // document.location.replace("/dashboard");
}

document
  .querySelector(".create-new-post")
  .addEventListener("submit", newEventHandler);
