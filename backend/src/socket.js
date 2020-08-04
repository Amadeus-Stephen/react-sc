const main = require("./server");
const server = require("http").createServer(main.app);
const io = require("socket.io")(server);
const Project = require("./database/models/project");
io.on("connection", (socket) => {
  socket.join("Home");
  io.sockets.in("Home").emit("init", "connected to server");
  const { id } = socket.client;
  const passportId = socket.request.session.passport.user;
  console.log(` passport id :${passportId}`);
  console.log(` socket id :${id}`);
  socket.on("getProjects", () => {
    Project.find({}, { id: true, name: true }).then((data) => {
      io.sockets.in("Home").emit("getProjects", data);
    });
  });

  socket.on("getProjectData", (data) => {
    if (!passportId) {
      io.to(id).emit("getProjectData", {
        error: { msg: "You need to sign in to use that feature" },
      });
    } else {
      if (data) {
        Project.findById(data)
          .then((project) => {
            if (project) {
              io.to(id).emit("getProjectData", { success: { project } });
            } else {
              io.to(id).emit("getProjectData", {
                error: { msg: "Could not get project" },
              });
            }
          })
          .catch(() => {
            io.to(id).emit("getProjectData", {
              error: { msg: "Could not get Project data" },
            });
          });
      }
    }
  });
});

exports.io = io;
exports.server = server;
