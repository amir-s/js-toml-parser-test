const parse = require("./parse");

describe("parse", function() {
  xit("parses the sample 1", function() {
    const test = `

[application]
name = "Toml Parser"
author = "John Smith"
license = "MIT"

[server]
ip = "127.0.0.1"
port = 3000
`;

    expect(parse(test)).toEqual({
      application: {
        name: "Toml Parser",
        author: "John Smith",
        license: "MIT"
      },
      server: {
        ip: "127.0.0.1",
        port: 3000
      }
    });
  });

  xit("parses the sample 2", function() {
    const test = `
[server]
ip = "127.0.0.1"
port = 3000

[[certificates]]
file = "/home/user/certificate/key.crt"
type = "user"

[[certificates]]
file = "/certificate/key.crt"
type = "root"

[[certificates]]
file = "/app/default/key.crt"
type = "default"
    
`;

    expect(parse(test)).toEqual({
      server: {
        ip: "127.0.0.1",
        port: 3000
      },
      certificates: [
        {
          file: "/home/user/certificate/key.crt",
          type: "user"
        },
        {
          file: "/certificate/key.crt",
          type: "root"
        },
        {
          file: "/app/default/key.crt",
          type: "default"
        }
      ]
    });
  });

  xit("parses the sample 3", function() {
    const test = `
[server]
ip = "127.0.0.1"

[server.web]
port = 3000
type = "http"

[server.mail]
port = 25
type = "smtp"

[server.ssh]
port = 22
type = "ssh"
`;

    expect(parse(test)).toEqual({
      server: {
        ip: "127.0.0.1",
        web: {
          port: 3000,
          type: "http"
        },
        mail: {
          port: 25,
          type: "smtp"
        },
        ssh: {
          port: 22,
          type: "ssh"
        }
      }
    });
  });
});
