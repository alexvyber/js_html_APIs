const init = async () => {
  const perms = await Notification.requestPermission();
  // In case we forget to delete then =))
  // const perms = await Notification.requestPermission().then(p => console.log(p))

  switch (perms) {
    case "granted": {
      console.log("granted");
      break;
    }
    case "denied": {
      console.log("DENIEDaaaaaaaaaaaaaaaaaa");
      break;
    }
    default: {
      throw new Error(
        `Permision can be only 'granted', 'default' or 'denied'. Get ${perms}`
      );
    }
  }
const showNotif = () => {
  const notification = notify("Some title", "Some text shit");
  if (notification) {
    notification.addEventListener("click", handleNotClick);
    console.log(notification);
  }
}

    setTimeout(showNotif, 2000)
};

const handleNotClick = (e) => {
  const body = document.getElementById("app");
  body.style.background = "red";
  window.parent.focus()
};

const icon =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Opml-icon-128x128.png";
 
const notify = (title, body) => {
  if (Notification.permission === "granted") {
    return new Notification(title, { body, icon });
  }

  return null;
};
if ("Notification" in window) {
  init();
}
