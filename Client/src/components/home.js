import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/material";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [oldTitle, setOldTitle] = useState("");
  const [oldContent, setOldContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleClickOpen = (e) => {
    setOpen(true);
    setOldTitle(e.target.parentElement.firstChild.innerText);
    setOldContent(e.target.parentElement.nextSibling.innerText);
    setNewTitle(e.target.parentElement.firstChild.innerText);
    setNewContent(e.target.parentElement.nextSibling.innerText);
  };

  const handleDelOpen=(e)=>{
    setDelOpen(true);
    setNewTitle(e.target.parentElement.firstChild.innerText);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelClose = () => {
    setDelOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:5000", {
      method: "GET",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setArticles(myJson);
      });
  });
  const handleClick = () => {
      fetch("http://localhost:5000/del", {
        method: "POST",
        crossDomain: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: newTitle
        }),
      })
        .then((res) => res.json())
        .then((response) => console.log(JSON.stringify(response)))
        .catch((error) => console.log(error));
        setDelOpen(false);
  };
  const handleUpdate=()=>{
    fetch("http://localhost:5000/edit", {
      method: "POST",
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        oldTitle,
        newTitle,
        newContent
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(JSON.stringify(response)))
      .catch((error) => console.log(error));
      setOpen(false);
  }
  return (
    <div className="pb-[5%] bg-sky-100">
      <div className="text-gray-700 text-4xl font-bold font-['monospace'] mb-4 pt-4 ml-[20%]">
        Your Articles!!!!
      </div>
      {articles.map(({ id, title, content }) => (
        <div
          key={id}
          className="w-[60%] bg-white shadow-2xl hover:scale-105 shadow-blue-900 rounded-3xl border-2 border-black px-8 pt-6 pb-8 mb-4 relative left-[20%]"
        >
          <div className="flex">
            <div className="text-gray-700 text-4xl font-bold font-['Calibri'] mb-4">
              {title}
            </div>
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white h-10 font-bold ml-2 px-2 rounded font-['sans-serif']"
              type="button"
              onClick={handleClickOpen}
            >
              Edit
            </button>
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white h-10 font-bold ml-2 px-2 rounded font-['sans-serif']"
              type="button"
              onClick={handleDelOpen}
            >
              Del
            </button>
          </div>
          <p className="font-['sans-serif'] text-lg">{content}</p>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this article, please post the new title or content here!!!
            Your Blog is updated automatically.
          </DialogContentText>
          <br></br>
          <DialogContentText>
            Title
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={oldTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <br></br><br></br>
          <DialogContentText>
            Content
          </DialogContentText>
          <br></br>
          <TextareaAutosize
            minRows={10}
            style={{width:"100%",borderWidth:"2px"}}
            defaultValue={oldContent}
            onChange={(event) => setNewContent(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Edit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={delOpen} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelClose}>Cancel</Button>
          <Button onClick={handleClick}>Delete</Button>
        </DialogActions>
      </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Home;
